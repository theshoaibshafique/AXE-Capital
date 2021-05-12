import React, { useContext, useEffect, useState } from "react";

function News() {
  useEffect(() => {
    function fetchData() {
      var url =
        "http://newsapi.org/v2/top-headlines?" +
        "sources=reuters&" +
        "q=Apple&" +
        "apiKey=43b464b7a7974aa3a97397f80c0798ef";

      var req = new Request(url);

      fetch(req).then(function (response) {
        console.log(response.json());
      });
      fetchData();
    }
  }, []);

  return <div></div>;
}

export default News;
