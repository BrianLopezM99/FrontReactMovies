import { useState, useEffect } from "react";
import "./App.css";
import Swal from "sweetalert2";

import Button from "@mui/material/Button";

import Film from "./components/Film";
import Customers from "./components/Customers";
import Inventory from "./components/Inventory";

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [viewFilms, setViewFilms] = useState(true);
  const [inventory, setInventory] = useState(false);
  const [disableViews, setDisableViews] = useState(false);

  const url_films = "http://localhost:5000/api/top5films";
  const url_customers = "http://localhost:5000/api/top5customers";
  const url_inventory = "http://localhost:5000/api/inventory";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url_films);
      const data = await response.json();
      const films = data.films;
      console.log(films);
      setData(films);
    };

    const fetchData2 = async () => {
      const response = await fetch(url_customers);
      const data = await response.json();
      console.log(data);
      setData2(data);
    };

    const fetchData3 = async () => {
      const response = await fetch(url_inventory);
      const data = await response.json();
      setData3(data);
    };

    fetchData();
    fetchData2();
    fetchData3();
  }, []);

  const handleChangeState = () => {
    setViewFilms(!viewFilms);
  };

  const handleChangeInventario = () => {
    setInventory(!inventory);
    setDisableViews(!disableViews);
  };

  const handleAddMovie = () => {
    Swal.fire({
      title: "Ingresa la nueva pelicula",
      html:
        '<input type="text" id="input1" class="swal2-input" placeholder="Titulo">' +
        '<input type="text" id="input2" class="swal2-input" placeholder="Descripcion">' +
        '<input type="number" id="input3" class="swal2-input" placeholder="Release Year" min="1900" max="2099" step="1">' +
        '<select type="text" id="input4" class="swal2-input" placeholder="Idioma">' +
        '<option value="">Seleccione Idioma</option>' +
        '<option value="1">Ingles</option>' +
        '<option value="2">Italiano</option>' +
        '<option value="3">Japones</option>' +
        '<option value="4">Mandarin</option>' +
        '<option value="5">Frances</option>' +
        '<option value="6">Aleman</option>' +
        "</select>" +
        '<input type="text" id="input5" class="swal2-input" placeholder="Duracion de renta">' +
        '<input type="text" id="input6" class="swal2-input" placeholder="Ratio de renta">' +
        '<input type="text" id="input7" class="swal2-input" placeholder="Duracion de pelicula">' +
        '<input type="text" id="input8" class="swal2-input" placeholder="costo de reemplazo">' +
        '<input type="text" id="input9" class="swal2-input" placeholder="Rating">' +
        '<div id=specialFeatures-container style="display: grid; grid-template-rows: 1fr 1fr; grid-template-columns: 1fr 1fr; padding: 0px 20px 0px 70px">' +
        '<label for="trailers">Trailers</label>' +
        '<input type="checkbox" id="trailers" name="specialfeatures" value="trailers">' +
        '<label for="commentaries">Commentaries</label>' +
        '<input type="checkbox" id="commentaries" name="specialfeatures" value="commentaries">' +
        '<label for="deleted-scenes">Deleted Scenes</label>' +
        '<input type="checkbox" id="deleted-scenes" name="specialfeatures" value="deleted-scenes">' +
        '<label for="behind-the-scenes">Behind the Scenes</label>' +
        '<input type="checkbox" id="behind-the-scenes" name="specialfeatures" value="behind-the-scenes">' +
        "</div>" +
        '<input type="text" id="input11" class="swal2-input" placeholder="Text">' +
        '<select type="text" id="input12" class="swal2-input" placeholder="Categoria">' +
        '<option value="">Seleccione una categoria</option>' +
        '<option value="1">Accion</option>' +
        '<option value="2">Animada</option>' +
        '<option value="3">Infantil</option>' +
        '<option value="4">Clasica</option>' +
        '<option value="5">Comedia</option>' +
        '<option value="6">Documental</option>' +
        '<option value="7">Drama</option>' +
        '<option value="8">Familiar</option>' +
        '<option value="9">Forense</option>' +
        '<option value="10">Juegos</option>' +
        '<option value="11">Horror</option>' +
        '<option value="12">Musical</option>' +
        '<option value="13">Nueva</option>' +
        '<option value="14">Sci-Fi</option>' +
        '<option value="15">Deportes</option>' +
        '<option value="16">Viaje</option>' +
        "</select>" +
        '<select type="text" id="input13" class="swal2-input" placeholder="Tienda">' +
        '<option value="">Seleccione una tienda</option>' +
        '<option value="1">Woodridge</option>' +
        '<option value="2">Lethbridge</option>' +
        "</select>",
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById("input1").value,
          description: document.getElementById("input2").value,
          release_year: parseInt(new Date(document.getElementById("input3").value).getFullYear()),
          language_id: parseInt(document.getElementById("input4").value),
          rental_duration: parseInt(document.getElementById("input5").value),
          rental_rate: parseFloat(document.getElementById("input6").value),
          length: parseInt(document.getElementById("input7").value),
          replacement_cost: parseFloat(document.getElementById("input8").value),
          rating: document.getElementById("input9").value,
          special_features: Array.from(document.querySelectorAll('input[name="specialfeatures"]:checked')).map((input) => input.value),
          fulltext: document.getElementById("input11").value,
          category_id: parseInt(document.getElementById("input12").value),
          store_id: parseInt(document.getElementById("input13").value),
        };
      },
    }).then((result) => {
      if (result.value) {
        // Do something with the inputs
        console.log(result.value);
        fetch("http://localhost:5000/api/films", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(result.value),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
          });
      }
    });
    
  };

  return (
    <>
      {viewFilms && !inventory ? (
        <>
          <Film data={data} />
          <br />
          <Button onClick={handleChangeState} variant="contained">
            Cambiar a compradores
          </Button>
          <br />
          <br />
          <Button onClick={handleChangeInventario} variant="contained">
            Inventario
          </Button>
        </>
      ) : !inventory ? (
        <>
          {" "}
          <Customers data2={data2} />
          <br />
          <Button onClick={handleChangeState} variant="contained">
            Cambiar a peliculas
          </Button>
          <br />
          <br />
          <Button onClick={handleChangeInventario} variant="contained">
            Inventario
          </Button>
        </>
      ) : null}

      {inventory && disableViews ? (
        <>
          {" "}
          <Inventory data3={data3} /> <br />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleChangeInventario} variant="contained">
              Salir del inventario
            </Button>{" "}
            <Button onClick={handleAddMovie} variant="contained">
              Agregar pelicula
            </Button>{" "}
          </div>
        </>
      ) : null}
    </>
  );
}

export default App;
