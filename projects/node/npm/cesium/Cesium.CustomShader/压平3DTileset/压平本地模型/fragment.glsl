// 所有isPointInPolygon函数

// 10个元素的数组
vec2 points_10[10];
bool isPointInPolygon_10(vec2 point){
  int nCross = 0; // 交点数
  const int n = 10; // Loop index cannot be compared with non-constant expression
  for(int i = 0; i < n; i++){
    vec2 p1 = points_10[i];
    vec2 p2 = points_10[int(mod(float(i+1),float(n)))];
    // 求解 y=p.y 与 p1 p2 的交点
    // p1p2 与 y=p0.y平行
    if(p1[1] == p2[1]){
      continue;
    }
    // 交点在p1p2延长线上
    if(point[1] < min(p1[1], p2[1])){
      continue;
    }
    if(point[1] >= max(p1[1], p2[1])){
      continue;
    }
    float x = p1[0] + ((point[1] - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]);
    if(x > point[0]){
      nCross++;
    }
  }
  return int(mod(float(nCross), float(2))) == 1;
}


// 5个元素的数组
vec2 points_5[5];
bool isPointInPolygon_5(vec2 point){
  int nCross = 0; // 交点数
  const int n = 5; // Loop index cannot be compared with non-constant expression
  for(int i = 0; i < n; i++){
    vec2 p1 = points_5[i];
    vec2 p2 = points_5[int(mod(float(i+1),float(n)))];
    // 求解 y=p.y 与 p1 p2 的交点
    // p1p2 与 y=p0.y平行
    if(p1[1] == p2[1]){
      continue;
    }
    // 交点在p1p2延长线上
    if(point[1] < min(p1[1], p2[1])){
      continue;
    }
    if(point[1] >= max(p1[1], p2[1])){
      continue;
    }
    float x = p1[0] + ((point[1] - p1[1]) * (p2[0] - p1[0])) / (p2[1] - p1[1]);
    if(x > point[0]){
      nCross++;
    }
  }
  return int(mod(float(nCross), float(2))) == 1;
}


void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material){
  vec3 modelMC = fsInput.attributes.positionMC;
  vec4 model_local_position = vec4(modelMC.x, modelMC.y, modelMC.z, 1.0);
  vec4 tileset_local_position = u_tileset_worldToLocalMatrix * czm_model * model_local_position;
  
  vec2 point = vec2(tileset_local_position.x,tileset_local_position.y);

  bool _isPointInPolygon = false;

  // 多个多边形区域判断
  
if (_isPointInPolygon == false) {
  points_10[0] = vec2(-60.31967639317736, -885.5938766286745);
  points_10[1] = vec2(5.961481437087059, -855.9881591452322);
  points_10[2] = vec2(154.90473576728255, -883.4861011542416);
  points_10[3] = vec2(236.1480896207504, -952.6758521632328);
  points_10[4] = vec2(257.1715567163192, -1061.8955670669711);
  points_10[5] = vec2(234.82578911352903, -1098.7094097207337);
  points_10[6] = vec2(155.66570101119578, -1112.6822270299344);
  points_10[7] = vec2(12.400513681583107, -1111.685445877727);
  points_10[8] = vec2(-55.49172409903258, -1090.506563659761);
  points_10[9] = vec2(-46.874586744233966, -999.8039323035664);
  if (isPointInPolygon_10(point)) {
    _isPointInPolygon = true;
  }
}

if (_isPointInPolygon == false) {
  points_5[0] = vec2(463.68057972565293, -890.5733635588585);
  points_5[1] = vec2(476.2839835048653, -1106.1302583012766);
  points_5[2] = vec2(748.893479663413, -1087.596492414832);
  points_5[3] = vec2(759.1017473856919, -841.2126562497615);
  points_5[4] = vec2(649.0828842590563, -958.7566817840598);
  if (isPointInPolygon_5(point)) {
    _isPointInPolygon = true;
  }
}
          

  if(_isPointInPolygon){
    // material.diffuse = vec3(1.0, 0.0, 0.0);
    // discard;
  }
}
