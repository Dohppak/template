import bibtexParse from "bibtex-parse-js";

export default function(dom, data) {
  let el = dom.querySelector('script[type="text/bibliography"]');

  //TODO If we don't have a local element, make a request for the document.
  if (el) {
    let rawBib = el.textContent;
    let bibliography = {};
    bibtexParse.toJSON(rawBib).forEach(e => {
      bibliography[e.citationKey] = e.entryTags;
      bibliography[e.citationKey].type = e.entryType;
    });

    let citations = [];
    var citeTags = [].slice.apply(dom.querySelectorAll("dt-cite"));
    citeTags.forEach(el => {
      let citationKeys = el.getAttribute("key").split(",");
      citationKeys.forEach(key => {
        if (citations.indexOf(key) == -1){
          citations.push(key);
          if (! (key in bibliography)){
              console.warn("No bibliography entry found for: " + key);
          }
        }
      });
    });
    data.bibliography = bibliography;
    data.citations = citations;
  }
}
