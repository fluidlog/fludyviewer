
$(document).ready()
{
  var myGraph = new FluidGraph();

  myGraph.config.bgElementType = "simple";
  myGraph.config.editGraphMode = false;
  myGraph.appli = "lesfaitsdesmots/loglink7.1/";
  myGraph.config.version = "loglink47";
  myGraph.config.viewerButtonLabel = "Launch Fludy map !";
  myGraph.externalStore.uri = "https://ldp.virtual-assembly.org:8443/2013/fludy/";
  myGraph.svgContainer.width = 280;
  myGraph.svgContainer.height = 280;
  myGraph.customNodes.strokeOpacity = 1;
  myGraph.customNodes.strokeWidth = 0;
  myGraph.customNodes.widthClosed = 30;
  myGraph.customNodes.displayType = "Off";

  myGraph.customNodes.colorType = {"loglink:qui" : "#FFF800",
                                    "loglink:quoi" : "#FF0000",
                                    "loglink:pourquoi" : "#FF7400",
                                    "loglink:ou" : "#3C00FD",
                                    "loglink:comment" : "#23FE00",
                                    "loglink:quand" : "#9F00FD",
                                    "loglink:combien" : "#AAAAAA",
                                    "loglink:without" : "#FFFFFF"
                                    };

  myGraph.customNodes.colorTypeRgba = {"loglink:qui" : "255,248,0",
                                        "loglink:quoi" : "255, 0, 0",
                                        "loglink:pourquoi" : "255, 116, 0",
                                        "loglink:ou" : "60, 0, 253",
                                        "loglink:comment" : "35, 254, 0",
                                        "loglink:quand" : "159, 0, 253",
                                        "loglink:combien" : "163,163,163",
                                        "loglink:without" : "255,255,255"
                                        };

  myGraph.customNodes.neighbourColorType = {"loglink:qui" : "#F3FD97",
                                      "loglink:quoi" : "#FDA8AE",
                                      "loglink:pourquoi" : "#FFDE98",
                                      "loglink:ou" : "#899DD5",
                                      "loglink:comment" : "#B5F49D",
                                      "loglink:quand" : "#C381D3",
                                      "loglink:combien" : "#AAAAAA",
                                      "loglink:without" : "#FFFFFF"
                                      };

  myGraph.customNodes.neighbourColorTypeRgba = {"loglink:qui" : "243,253,151",
                                        "loglink:quoi" : "253,168,174",
                                        "loglink:pourquoi" : "255,222,152",
                                        "loglink:ou" : "137,157,213",
                                        "loglink:comment" : "181,244,157",
                                        "loglink:quand" : "195,129,211",
                                        "loglink:combien" : "163,163,163",
                                        "loglink:without" : "255,255,255"
                                        };

  myGraph.customNodes.strokeNeighbourColorType = {"loglink:qui" : "#CDCB14",
                                      "loglink:quoi" : "#DA0918",
                                      "loglink:pourquoi" : "#AB7C1A",
                                      "loglink:ou" : "#1A398F",
                                      "loglink:comment" : "#30AD02",
                                      "loglink:quand" : "#6F1286",
                                      "loglink:combien" : "#2F2B2B",
                                      "loglink:without" : "#FFFFFF"
                                    };

  myGraph.customNodes.strokeNeighbourColorTypeRgba = {"loglink:qui" : "205,203,20",
                                      "loglink:quoi" : "218,9,24",
                                      "loglink:pourquoi" : "171,124,26",
                                      "loglink:ou" : "26,57,143",
                                      "loglink:comment" : "48,173,2",
                                      "loglink:quand" : "111,18,134",
                                      "loglink:combien" : "47,43,43",
                                      "loglink:without" : "255,255,255"
                                    };

  myGraph.customNodes.imageType = {"loglink:qui" : "yellow user",
                                    "loglink:quoi" : "red cube",
                                    "loglink:pourquoi" : "orange help",
                                    "loglink:ou" : "blue unhide",
                                    "loglink:comment" : "green lab",
                                    "loglink:quand" : "violet wait",
                                    "loglink:combien" : "grey money",
                                    "loglink:without" : "circle thin"};

  myGraph.customNodes.strokeColorType = {"loglink:qui" : "#CDCB14",
                                      "loglink:quoi" : "#DA0918",
                                      "loglink:pourquoi" : "#AB7C1A",
                                      "loglink:ou" : "#1A398F",
                                      "loglink:comment" : "#30AD02",
                                      "loglink:quand" : "#6F1286",
                                      "loglink:combien" : "#2F2B2B",
                                      "loglink:without" : "#FFFFFF"
                                    };

  var $activTab = "local";

  if ($activTab == "local")
  {
    $("#menuTabs .item").tab('change tab', 'local');
  }

  $('#menuTabs .item').tab({history:false});

  // $divTest = $("#test");
  // myGraph.loadLocalGraph("place to b");
  // myGraph.initSvgContainer("#test");
  // myGraph.drawGraph();
  // myGraph.movexy();

  /*******************************/
  /* Load local graph into cards */
  /*******************************/

  myGraph.getListOfGraphsInLocalStorage();

  $divLocalCards = $("#divLocalCards");
  myGraph.listOfLocalGraphs.forEach(function(value, index) {
    var $graphName = value[0];
    var $graphId = index;
    myGraph.loadLocalGraph($graphName);
    myGraph.graphInCard($divLocalCards, $graphId, $graphName, 'local');
  });

  /**********************************/
  /* Load external graph into cards */
  /**********************************/

  $("#message").html("<p>Les vignettes des cartos PAIR peuvent mettre du temps à apparaitre.<br>"
  + "Si les vignettes ne s'affichent pas, plusieurs raisons possibles :"
  + "<ul><li>Soit le serveur de base de données n'est pas démarré : "
  + "dans ce cas envoyez un email à <a href='mailto:contact@assemblee-virtuelle.org'>contact@assemblee-virtuelle.org</a></li>"
  + "<li>Acceptez l'exception de sécurité : "
  +" <a href='https://ldp.virtual-assembly.org:8443/'>En cliquant sur ce lien</a> jusqu'à obtenir un logo 'stample',"
  +" puis retourner <a href='"+myGraph.domaine+"skippair'>sur Fludy Viewer</a></li></p>").show();

  var store = new MyStore({ container : myGraph.externalStore.uri,
                            context : myGraph.externalStore.context,
                            template : "",
                            partials : ""})

  var storeList = new MyStore({ container : myGraph.externalStore.uri,
                            context : "http://owl.openinitiative.com/oicontext.jsonld",
                            template : "",
                            partials : ""})

  storeList.list(myGraph.externalStore.uri).then(function(list){
    list.forEach(function(item){
      $("#message").hide();
      var $externalGraphId;
      var $externalGraphName;
      storeList.get(item["@id"]).then(function(graphElementJsonld){
        $externalGraphId = graphElementJsonld["@id"].split("/").pop();
        $externalGraphName = graphElementJsonld["foaf:name"];

        if ($externalGraphId)
        {
          var $divExternalCards = $("#divExternalCards");
          store.get(myGraph.externalStore.uri+$externalGraphId).then(function(externalGraph){
            myGraph.d3Data = myGraph.jsonLdToD3Data(externalGraph);
            myGraph.graphInCard($divExternalCards, $externalGraphId, $externalGraphName, 'external');
          });
        }
      })
    })
  });

}
