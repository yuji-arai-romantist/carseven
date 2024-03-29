const App = {
  delimiters: ['[[', ']]'],
  data() {
    return {
      cars: [],
      modelYears: [],
      distances: [],
      showModalName: "",
      selectedValues: {
        maker_mei: "",
        shashu_mei: "",
        nenshiki: "",
        sokokyori: "",
      },
    };
  },
  mounted() {
    this.fetchData(
      [
        "assets/js/car_data.json",
        "assets/js/model_year_data.json",
        "assets/js/distance_data.json",
      ],
      () => {
        Runjs.init();
      }
    );
  },
  watch: {
    showModalName() {
      document.documentElement.style.overflowX = !this.showModalName ? "hidden" : "visible";
      document.body.style.overflow = this.showModalName ? "hidden" : "visible";
    },
  },
  methods: {
    fetchData(urls, callback) {
      const fetchPromises = urls.map((url) => {
        return fetch(url).then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        });
      });

      Promise.all(fetchPromises)
        .then((data) => {
          [this.cars, this.modelYears, this.distances] = data;
          callback();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    showModal(name) {
      this.showModalName = name;
    },
    hideModal() {
      this.showModalName = "";
    },
    setValues(key, value) {
      this.selectedValues[key] = value;
      if (key === "maker_mei") {
        this.selectedValues["shashu_mei"] = "";
      }

      this.showModalName = this.getNextModalNaem(key);
    },
    getCars(selectedValue) {
      return this.cars.find((v) => v.value === selectedValue).car;
    },
    getNextModalNaem(currentName) {
      let name = "";

      if (!this.selectedValues["maker_mei"]) {
        name = "";
      } else if (
        currentName === "maker_mei" &&
        !this.selectedValues["shashu_mei"]
      ) {
        name = "shashu_mei";
      } else if (
        currentName === "shashu_mei" &&
        !this.selectedValues["nenshiki"]
      ) {
        name = "nenshiki";
      } else if (
        currentName === "nenshiki" &&
        !this.selectedValues["sokokyori"]
      ) {
        name = "sokokyori";
      }

      return name;
    },
  },
};

Vue.createApp(App).mount("#vue-app");
