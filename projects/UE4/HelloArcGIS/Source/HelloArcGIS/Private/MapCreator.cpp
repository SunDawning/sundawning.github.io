// Fill out your copyright notice in the Description page of Project Settings.

#include "MapCreator.h"

#include "Engine/SkyLight.h"
#include "Engine/World.h"
#include "Kismet/GameplayStatics.h"
#include "ArcGISMapsSDK/API/ArcGISRuntime/Geometry/SpatialReference.h"
#include "ArcGISMapsSDK/API/GameEngine/Camera/ArcGISCamera.h"
#include "ArcGISMapsSDK/API/GameEngine/Elevation/ArcGISImageElevationSource.h"
#include "ArcGISMapsSDK/API/GameEngine/Map/ArcGISBasemap.h"
#include "ArcGISMapsSDK/API/GameEngine/Map/ArcGISMap.h"
#include "ArcGISMapsSDK/API/GameEngine/Map/ArcGISMapElevation.h"
#include "ArcGISMapsSDK/API/GameEngine/Map/ArcGISMapType.h"
#include "ArcGISMapsSDK/API/GameEngine/View/ArcGISRendererView.h"
#include "ArcGISMapsSDK/API/GameEngine/View/ArcGISRendererViewOptions.h"
#include "ArcGISMapsSDK/Actors/ArcGISMapView.h"
#include "ArcGISMapsSDK/Components/ArcGISCameraComponent.h"
#include "SampleDefaultPawn.h"

#include "ArcGISMapsSDK/API/Unreal/Collection.h"
#include "ArcGISMapsSDK/API/GameEngine/Layers/ArcGIS3DModelLayer.h"
#include "ArcGISMapsSDK/API/GameEngine/Layers/ArcGISImageLayer.h"
#include "ArcGISMapsSDK/API/GameEngine/Layers/ArcGISIntegratedMeshLayer.h"

#include "ArcGISMapsSDK/API/GameEngine/Layers/Base/ArcGISLayerType.h"

// Sets default values
AMapCreator::AMapCreator()
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
	UE_LOG(LogTemp, Warning, TEXT("你好"));

	ArcGISRendererComponent = CreateDefaultSubobject<UArcGISRendererComponent>(TEXT("ArcGISRendererComponent"));
	AddOwnedComponent(ArcGISRendererComponent);
}

// Called when the game starts or when spawned
void AMapCreator::BeginPlay()
{
	Super::BeginPlay();
	CreateArcGISMap();
}

void AMapCreator::CreateArcGISMap()
{
	UE_LOG(LogTemp, Warning, TEXT("CreateArcGISMap"));

	constexpr auto apiKey = "AAPK7ec4f846227a4cb681bbcd15d869f1c21g0yqzqG-N036rK79CPnJHb5pTihm6D2piS7A9WEL_pxQTdu0DqPCcpDCu559IfX";

	auto mapType = Esri::GameEngine::Map::ArcGISMapType::Global;
	auto arcGISMap = ::MakeShared<Esri::GameEngine::Map::ArcGISMap>(mapType);

	// Add a basemap
	// auto arcGISBasemap = Esri::GameEngine::Map::ArcGISBasemap("https://www.arcgis.com/sharing/rest/content/items/86265e5a4bbb4187a59719cf134e0018/data", apiKey);
	// 使用MapServer地址
	auto arcGISBasemap = Esri::GameEngine::Map::ArcGISBasemap("https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer", Esri::GameEngine::Layers::Base::ArcGISLayerType::ArcGISImageLayer, apiKey);
	// Set the basemap
	arcGISMap->SetBasemap(arcGISBasemap);

	auto elevationLayer = Esri::GameEngine::Elevation::ArcGISImageElevationSource("https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer", "Elevation", apiKey);
	arcGISMap->SetElevation(elevationLayer);

	// The position of the camera is a placeholder and will be internally overwritten
	Esri::GameEngine::Location::ArcGISPosition position(28, 120, 1000, Esri::ArcGISRuntime::Geometry::SpatialReference::WGS84());
	Esri::GameEngine::Location::ArcGISRotation rotation(65, 68, 0);
	FString cameraName("Camera");
	auto arcGISCamera = ::MakeShared<Esri::GameEngine::Camera::ArcGISCamera>(cameraName, position, rotation);
	// Create the renderer view options config struct
	Esri::GameEngine::View::ArcGISRendererViewOptions rendererViewOptions{false};
	// Create the renderer view and set it the camera and the map
	auto rendererView = ::MakeShared<Esri::GameEngine::View::ArcGISRendererView>(arcGISMap, arcGISCamera, rendererViewOptions);
	// Set the renderer view to the renderer component
	ArcGISRendererComponent->SetRendererView(rendererView);
	if (UArcGISCameraComponent *const arcGISDataCamera = Cast<UArcGISCameraComponent>(ArcGISDataCameraReference.GetComponent(GetOwner())))
	{
		// Set the renderer view to the camera component
		arcGISDataCamera->SetRendererView(rendererView);
	}

	// Create layers
	// https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer
	// http://61.175.211.102/arcgis/rest/services/wzmap_wz2000/MapServer
	// https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer
	// http://10.89.9.234:8080/geoserver/rest/services/LG/HX_T520001_HP_2022_TILE/MapServer
	// https://mape.shanghai-map.net/arcgis/rest/services/1979_yx_2000/MapServer
	// https://mape.shanghai-map.net/arcgis/rest/services/metro_l/MapServer
	// https://services.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/MapServer
	// https://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT_TXT_3857/MapServer
	// auto layer_0 = Esri::GameEngine::Layers::ArcGISImageLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer", "MyLayer_0", 1.0f, true, apiKey);
	// arcGISMap->GetLayers().Add(layer_0);
	// UE_LOG(LogTemp, Warning, TEXT("添加图层：World_Imagery"));
	// auto layer_3 = Esri::GameEngine::Layers::ArcGISImageLayer("https://mape.shanghai-map.net/arcgis/rest/services/metro_l/MapServer", "MyLayer_3", 1.0f, true, apiKey);
	// arcGISMap->GetLayers().Add(layer_3);
	// UE_LOG(LogTemp, Warning, TEXT("添加图层：metro_l"));
	// auto layer_1 = Esri::GameEngine::Layers::ArcGISImageLayer("https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer", "MyLayer_1", 1.0f, true, apiKey);
	// arcGISMap->GetLayers().Add(layer_1);
	// UE_LOG(LogTemp, Warning, TEXT("添加图层：ChinaOnlineCommunity"));
	// auto layer_2 = Esri::GameEngine::Layers::ArcGISImageLayer("http://10.89.9.234:8080/geoserver/rest/services/LG/HX_T520001_HP_2022_TILE/MapServer", "MyLayer_2", 1.0f, true, apiKey);
	// arcGISMap->GetLayers().Add(layer_2);
	// auto layer_3 = Esri::GameEngine::Layers::ArcGISImageLayer("https://services.nationalmap.gov/arcgis/rest/services/USGSNAIPImagery/MapServer", "MyLayer_3", 1.0f, true, apiKey);
	// arcGISMap->GetLayers().Add(layer_3);
}

// Called every frame
void AMapCreator::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}
