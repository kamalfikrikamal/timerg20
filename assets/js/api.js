const api_url = "http://128.199.214.132:8080/scenario";

getapi(api_url);

async function getapi(url) {  
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  show(data);
}
  
function show(data) {
  console.log(data);
  let tab = 
    `<tr>
      <th>Skenario</th>
      <th>Status</th>
      <th>Sisa Waktu</th>
    </tr>`;
  
  // Loop to access all rows
  var arrayLength = data.length;
  for (var i = 0; i < arrayLength; i++) {
    tab += `<tr> 
    <td>${data[i].skenario} </td>
    <td>${data[i].status}</td>
    <td>${data[i].waktu}</td>
    </tr>`;
  }
  // Setting innerHTML as tab variable
  document.getElementById("scenarios").innerHTML = tab;
}

async function reset() {
  await fetch('http://128.199.214.132:8080/reset', {
    method: 'PUT',
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => window.location.href='index.html')
}