// 所有isPointInPolygon函数

// 67个元素的数组
vec2 points_67[67];
bool isPointInPolygon_67(vec2 point){
  int nCross = 0; // 交点数
  const int n = 67; // Loop index cannot be compared with non-constant expression
  for(int i = 0; i < n; i++){
    vec2 p1 = points_67[i];
    vec2 p2 = points_67[int(mod(float(i+1),float(n)))];
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

  // 在外包矩形内
  if(tileset_local_position.x < u_MinimalBoundingRectangle[0]){
    return;
  }
  if(tileset_local_position.y < u_MinimalBoundingRectangle[1]){
    return;
  }  
  if(tileset_local_position.x > u_MinimalBoundingRectangle[2]){
    return;
  }
  if(tileset_local_position.y > u_MinimalBoundingRectangle[3]){
    return;
  }  
  
  vec4 tileset_local_position_transformed = vec4(tileset_local_position.x, tileset_local_position.y, 0.0 + (- u_tilesetHeight) + u_flatHeight, 1.0);
  vec4 model_local_position_transformed = czm_inverseModel * u_tileset_localToWorldMatrix * tileset_local_position_transformed;

  vec2 point = vec2(tileset_local_position.x,tileset_local_position.y);

  bool _isPointInPolygon = false;

  // 多个多边形区域判断

  if (_isPointInPolygon == false) {
    points_67[0] = vec2(2008.4082086181058, -15826.31669394765);
    points_67[1] = vec2(1999.7030615910678, -16115.122679202817);
    points_67[2] = vec2(1989.72744941402, -16129.187626367435);
    points_67[3] = vec2(1975.1219282626896, -16133.619524678215);
    points_67[4] = vec2(1910.7307414889126, -16124.44057994755);
    points_67[5] = vec2(1832.5562720840587, -16119.797917749267);
    points_67[6] = vec2(1832.352655601853, -16146.586717688013);
    points_67[7] = vec2(1997.652249700555, -16164.290333342738);
    points_67[8] = vec2(2003.8247292807116, -16170.823028579354);
    points_67[9] = vec2(2001.8803168345964, -16248.559362213593);
    points_67[10] = vec2(2007.6423997377767, -16262.843720970675);
    points_67[11] = vec2(2018.1357744673057, -16274.580494494177);
    points_67[12] = vec2(2031.199965218713, -16280.780052940827);
    points_67[13] = vec2(2080.6781066727617, -16294.726295993663);
    points_67[14] = vec2(2165.028688987417, -16323.286859536078);
    points_67[15] = vec2(2235.699801303612, -16355.947799673304);
    points_67[16] = vec2(2301.433597410729, -16391.372696043458);
    points_67[17] = vec2(2370.9748847528153, -16438.088808991015);
    points_67[18] = vec2(2457.2875688156837, -16509.2782043661);
    points_67[19] = vec2(2268.6637918424585, -16691.35680732783);
    points_67[20] = vec2(2228.953207323493, -16655.48457808979);
    points_67[21] = vec2(2171.6528344472663, -16618.83801871445);
    points_67[22] = vec2(2090.693453836886, -16575.994000453036);
    points_67[23] = vec2(2032.9839220486372, -16550.201054101344);
    points_67[24] = vec2(1935.7750884580216, -16525.849661440123);
    points_67[25] = vec2(1819.8501127848192, -16513.81983840838);
    points_67[26] = vec2(1817.8974167994945, -16543.591751265805);
    points_67[27] = vec2(1794.8550334877125, -16541.925334355794);
    points_67[28] = vec2(1797.6325543543114, -16519.02921098238);
    points_67[29] = vec2(1781.8915755405812, -16516.016936264);
    points_67[30] = vec2(1776.332746637219, -16478.146731568035);
    points_67[31] = vec2(1761.5162979934155, -16444.038249705918);
    points_67[32] = vec2(1737.7531794083095, -16427.9830301092);
    points_67[33] = vec2(1726.3329505242198, -16405.504657779355);
    points_67[34] = vec2(1726.2293547211937, -16398.971170002595);
    points_67[35] = vec2(1694.0309187743603, -16375.608691998292);
    points_67[36] = vec2(1649.5929493705532, -16360.221073271241);
    points_67[37] = vec2(1620.894254450386, -16357.677187930327);
    points_67[38] = vec2(1568.846673076672, -16362.112113338895);
    points_67[39] = vec2(1538.401023042088, -16376.400319139007);
    points_67[40] = vec2(1509.7053382589272, -16408.95528661227);
    points_67[41] = vec2(1471.0331382147758, -16447.83016389003);
    points_67[42] = vec2(1459.2071682584262, -16480.05739616044);
    points_67[43] = vec2(1454.9937324311375, -16523.2435040758);
    points_67[44] = vec2(1467.6515771985776, -16583.372349156067);
    points_67[45] = vec2(1412.1086071633524, -16618.59123564558);
    points_67[46] = vec2(1358.417227348478, -16653.039051781874);
    points_67[47] = vec2(1248.0336483238987, -16519.720826680306);
    points_67[48] = vec2(1169.234171417707, -16432.24591846438);
    points_67[49] = vec2(1151.7463146934076, -16416.41052224813);
    points_67[50] = vec2(1139.7099932117178, -16396.810927377548);
    points_67[51] = vec2(1132.5080057807988, -16374.442532794084);
    points_67[52] = vec2(1143.6152801035694, -16350.190240463242);
    points_67[53] = vec2(1163.4668682629033, -16337.125603890512);
    points_67[54] = vec2(1230.940538211891, -16293.046606986783);
    points_67[55] = vec2(1355.397322077935, -16231.68759361608);
    points_67[56] = vec2(1487.5693325942173, -16184.836463293526);
    points_67[57] = vec2(1646.999588520897, -16153.256902729161);
    points_67[58] = vec2(1706.2461807193956, -16147.488749612588);
    points_67[59] = vec2(1767.6536870050966, -16144.16219181614);
    points_67[60] = vec2(1767.1412046115636, -16158.780853020493);
    points_67[61] = vec2(1791.724480643568, -16157.336621291004);
    points_67[62] = vec2(1808.4901983152865, -16161.754714287352);
    points_67[63] = vec2(1825.4053465762897, -15673.854000785854);
    points_67[64] = vec2(2002.629240337459, -15678.817695919424);
    points_67[65] = vec2(2012.5052188697061, -15690.00261007389);
    points_67[66] = vec2(2010.763121632093, -15735.409407796804);
    if (isPointInPolygon_67(point)) {
      _isPointInPolygon = true;
    }
  }

  if(_isPointInPolygon){
    vsOutput.positionMC.x = model_local_position_transformed.x;
    vsOutput.positionMC.y = model_local_position_transformed.y;
    vsOutput.positionMC.z = model_local_position_transformed.z;
  }  
}
