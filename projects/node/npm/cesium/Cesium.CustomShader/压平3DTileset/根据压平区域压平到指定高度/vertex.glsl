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
void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput){
  vec3 modelMC = vsInput.attributes.positionMC;
  vec4 model_local_position = vec4(modelMC.x, modelMC.y, modelMC.z, 1.0);
  vec4 tileset_local_position = u_tileset_worldToLocalMatrix * czm_model * model_local_position;

  vec2 point = vec2(tileset_local_position.x,tileset_local_position.y);
  float ground_z = 0.0 + (- u_tilesetHeight);

  points_5[0] = vec2(463.68057972565293, -890.5733635588585);
  points_5[1] = vec2(476.2839835048653, -1106.1302583012766);
  points_5[2] = vec2(748.893479663413, -1087.596492414832);
  points_5[3] = vec2(759.1017473856919, -841.2126562497615);
  points_5[4] = vec2(649.0828842590563, -958.7566817840598);
  if (isPointInPolygon_5(point)) {
    vec4 tileset_local_position_transformed = vec4(tileset_local_position.x, tileset_local_position.y, ground_z + 32.0, 1.0);
    vec4 model_local_position_transformed = czm_inverseModel * u_tileset_localToWorldMatrix * tileset_local_position_transformed;      
    vsOutput.positionMC.x = model_local_position_transformed.x;
    vsOutput.positionMC.y = model_local_position_transformed.y;
    vsOutput.positionMC.z = model_local_position_transformed.z;     
    return;
  }
}
