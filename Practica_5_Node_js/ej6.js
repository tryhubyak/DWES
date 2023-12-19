var variableGlobal = "Esta es la variable GLOBAL";

function funcionLocGlob() {
  var variableLocal = "Esta es la variable LOCAL";

  console.log("Variable global:", variableGlobal);
  console.log("Variable local:", variableLocal);
}

funcionLocGlob();