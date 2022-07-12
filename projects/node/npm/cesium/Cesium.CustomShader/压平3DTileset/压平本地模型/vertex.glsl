// 所有isPointInPolygon函数

// 4个元素的数组
vec2 points_4[4];
bool isPointInPolygon_4(vec2 point){
  int nCross = 0; // 交点数
  const int n = 4; // Loop index cannot be compared with non-constant expression
  for(int i = 0; i < n; i++){
    vec2 p1 = points_4[i];
    vec2 p2 = points_4[int(mod(float(i+1),float(n)))];
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
                          
void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput){
  vec3 modelMC = vsInput.attributes.positionMC;
  vec4 model_local_position = vec4(modelMC.x, modelMC.y, modelMC.z, 1.0);
  vec4 tileset_local_position = u_tileset_worldToLocalMatrix * czm_model * model_local_position;
  vec4 tileset_local_position_transformed = vec4(tileset_local_position.x, tileset_local_position.y, 0.0 + (- u_tilesetHeight) + u_flatHeight, 1.0);
  vec4 model_local_position_transformed = czm_inverseModel * u_tileset_localToWorldMatrix * tileset_local_position_transformed;

  vec2 point = vec2(tileset_local_position.x,tileset_local_position.y);

  bool _isPointInPolygon = false;

  // 多个多边形区域判断

  if (_isPointInPolygon == false) {
    points_4[0] = vec2(-31.131186564802192, 57.65918693133426);
    points_4[1] = vec2(37.0609385400312, 59.101344128612254);
    points_4[2] = vec2(34.94172433426138, -12.006913033306773);
    points_4[3] = vec2(-27.07671606040094, -9.34453842415678);
    if (isPointInPolygon_4(point)) {
      _isPointInPolygon = true;
    }
  }

  if(_isPointInPolygon){
    vsOutput.positionMC.x = model_local_position_transformed.x;
    vsOutput.positionMC.y = model_local_position_transformed.y;
    vsOutput.positionMC.z = model_local_position_transformed.z;
  }  
}
