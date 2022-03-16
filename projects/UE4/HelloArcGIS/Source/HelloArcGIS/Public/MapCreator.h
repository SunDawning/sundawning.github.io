// Fill out your copyright notice in the Description page of Project Settings.

#pragma once

#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "ArcGISMapsSDK/Components/ArcGISRendererComponent.h"
#include "MapCreator.generated.h"

UCLASS()
class HELLOARCGIS_API AMapCreator : public AActor
{
	GENERATED_BODY()
	
public:	
	// Sets default values for this actor's properties
	AMapCreator();
	UPROPERTY(EditInstanceOnly,
          meta = (DisplayName = "ArcGISDataCamera", UseComponentPicker, AllowAnyActor, AllowedClasses = "ArcGISCameraComponent"))
	FComponentReference ArcGISDataCameraReference;

protected:
	// Called when the game starts or when spawned
	virtual void BeginPlay() override;

	UArcGISRendererComponent* ArcGISRendererComponent;
	void CreateArcGISMap();

public:	
	// Called every frame
	virtual void Tick(float DeltaTime) override;

};
