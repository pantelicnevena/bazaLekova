/**
 * Created by nevena on 9.4.15..
 */

app.controller('LekoviController', ['$scope', '$sce', '$mdSidenav', 'Drugs', 'Atcs', function($scope, $sce, $mdSidenav, Drugs, Atcs) {
  $scope.ucitano = false;
  $scope.prikaziJos = true;
  $scope.trenutniId = 0;
  $scope.ucitanSadrzaj = false;
  $scope.lekovi = [];
  $scope.trezeniLek = "";
  $scope.pretraga = function(pre){
    $scope.trezeniLek = pre;
  };

  $scope.lekovi = Drugs.find({
    filter: {
      where: { id: {between: [1, 150]} }
    }
  }, function(){
    $scope.ucitano = true;
    $scope.prikaziJos = true;
  });



  $scope.pokreniPretragu = function(pretraga){
    $scope.lekovi = [];
    $scope.ucitano = false;
    $scope.prikaziJos = false;

    //ako je unos pretrage prazan string --> vrati pocetno stanje
    if (pretraga == "") {
      $scope.lekovi = Drugs.find({
        filter: {
          where: { id: {between: [1, 150]} }
        }
      }, function(){
        $scope.ucitano = true;
        $scope.prikaziJos = true;
      });
    } else {
      //ako je unos pretrage jedno slovo --> pretraziti sve nazive koji pocinju tim slovom
      if (pretraga.length == 1){
        var prvoSlovo = Drugs.find({
          order: 'naziv DESC',
          filter: {
            where: {registeredName: {like: pretraga + "%"}}
          }
        }, function () {
          $scope.ucitano = true;
          for (i = 0; i < prvoSlovo.length; i++) {
            $scope.lekovi.push(prvoSlovo[i]);
          }
          ;
        });
      }else {
        var nazivi = Drugs.find({
          order: 'naziv DESC',
          filter: {
            where: {registeredName: {like: "%" + pretraga + "%"}}
          }
        }, function () {
          $scope.ucitano = true;
          for (i = 0; i < nazivi.length; i++) {
            $scope.lekovi.push(nazivi[i]);
          }
          ;
        });

        var paralele = Drugs.find({
          order: 'naziv DESC',
          filter: {
            where: {paralele: {like: "%" + pretraga + "%"}}
          }
        }, function () {
          $scope.ucitano = true;
          for (i = 0; i < paralele.length; i++) {
            $scope.lekovi.push(paralele[i]);
          }
          ;
        });
      }
    }
    /*console.log(pretraga);
     console.log($scope.lekovi);*/
  };

  $scope.loadMore = function() {
    $scope.trenutniId = $scope.lekovi.length;
    var jos = Drugs.find({
      filter: {
        where: {id: {between: [$scope.trenutniId, $scope.trenutniId+150]}}
      }
    }, function(){
      for (i = 0; i< jos.length; i++){
        $scope.lekovi.push(jos[i]);
      }
    });
  };



  $scope.prikaz = function(lek){
    $scope.ucitanSadrzaj = true;
    $scope.podaci = lek;

    $scope.doziranje = lek.dosing;
    $scope.deliberatelyTrustDangerousSnippet = function() {
      return $sce.trustAsHtml($scope.doziranje);
    };
    $scope.sastav = lek.ingredient;
    if (lek.insuranceList == null){
      $scope.osiguranje = "Nema";
    } else{
      $scope.osiguranje = lek.insuranceList;
    }

    // ** PARALELE ** //

    $scope.paralele = paraleleLeka($scope, lek, Atcs);


    var id = lek.id;

  };


  $scope.pretraziParalelu = function(paralela) {
    $scope.input = paralela;

    console.log($scope.input);
  };

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };
}]);



function paraleleLeka($scope, lek, Atcs){
  var nizParalela = [];
  var par1 = Atcs.findById({
    id: lek.atc1Id
  });
  nizParalela.push(par1);

  var par2 = Atcs.findById({
    id: lek.atc2Id
  });
  nizParalela.push(par2);

  var par3 = Atcs.findById({
    id: lek.atc3Id
  });
  nizParalela.push(par3);

  var par4 = Atcs.findById({
    id: lek.atc4Id
  });
  nizParalela.push(par4);

  var par5 = Atcs.findById({
    id: lek.atc5Id
  });
  nizParalela.push(par5);
  $scope.paralele = nizParalela;
  //console.log($scope.paralele);

  return $scope.paralele;
}
