document.addEventListener('DOMContentLoaded', () => {
  
  
  handleFormSubmit()
  getCryptids()
  getReports()
})


// Use AJAX to get the reports and append them to a table in the DOM
function getReports() {
  axios.get('/reports')
  .then((response) => {
    // handle success
    console.log(response);
    
    // clear out the reports tbody
    let tbody = document.querySelector('#list-reports tbody')
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild)
    }
      
    // DOM manipulation, need to create TRs, TDs
    response.data.forEach((report) => {
      let tr = document.createElement('tr')
      let name = document.createElement('td')
      let content = document.createElement('td')
      let reported_at = document.createElement('td')
      let location = document.createElement('td')
      let cryptid_spotted = document.createElement('td')
      let del_td = document.createElement('td')
      let del_button = document.createElement('button')
      
      name.innerText = report.name
      content.innerText = report.content
      reported_at.innerText = report.reported_at
      location.innerText = report.location
      cryptid_spotted.innerText = report.cryptid_id
      del_button.innerText = "X"
      del_button.setAttribute('data-id', report.id)
      del_button.addEventListener('click', (ev) => {
        let recordId = ev.target.getAttribute('data-id')
        console.log('id', recordId);
        
        // DELETE THIS RECORD!
        axios.delete(`/reports/${recordId}`)
        .then((response) => {
          console.log(response)
          ev.target.parentElement.parentElement.remove()
        })
        .catch((err) => {
          console.log(err)
        })
      })
    
      // append the TDs to the TR, the TR to the TBODY
      del_td.appendChild(del_button)
      tr.appendChild(name)
      tr.appendChild(content)
      tr.appendChild(reported_at)
      tr.appendChild(location)
      tr.appendChild(cryptid_spotted)
      tr.appendChild(del_td)
      tbody.appendChild(tr)
    })
    
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}

// Use AJAX to get the cryptids and append them to a table in the DOM
function getCryptids() {
  axios.get('/cryptids')
  .then((response) => {
    // handle success
    console.log(response);
    
    // DOM manipulation, need to create TRs, TDs
    response.data.forEach((cryptid) => {
      let tbody = document.querySelector('#list-cryptids tbody')
      let select = document.querySelector('form#create-report select#cryptid_id')
      let tr = document.createElement('tr')
      let name = document.createElement('td')
      let bio = document.createElement('td')
      let photoTD = document.createElement('td')
      let photo = document.createElement('img')
      let option = document.createElement('option')
      
      name.innerText = cryptid.name
      bio.innerText = cryptid.bio
      photo.setAttribute('src', cryptid.photo)
      option.innerText = cryptid.name
      option.setAttribute('value', cryptid.id)
      
      // append IMG, to the TD, append the TDs to the TR, the TR to the TBODY
      photoTD.appendChild(photo)
      tr.appendChild(name)
      tr.appendChild(bio)
      tr.appendChild(photoTD)
      tbody.appendChild(tr)
      select.appendChild(option)
      
    })
    
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}

function handleFormSubmit() {
  let form = document.getElementById('create-report')
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()
    
    // grab all values from the form
    let postData = {}
    let formElements = ev.target.elements
    
    for (var i = 0; i < formElements.length; i++) {
      let inputName = formElements[i].name
      if( inputName ) {
        postData[inputName] = formElements[i].value  
      }
    }
    
    console.log('postData', postData);
    
    // axios.post that data to the correct backend route
    axios.post('/reports', postData)
    .then((response) => {
      console.log(response)
      getReports()  //call this once again
    })
    .catch((error) => {
      console.log(error)
    })
  })
}