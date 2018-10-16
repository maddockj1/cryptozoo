document.addEventListener('DOMContentLoaded', () => {
    getUserData(2)
})

function getUserData(uid) {
  axios.get(`/users/${uid}`)
  .then((response) => {
    // handle success
    console.log(response.data);
    
    // populate user data on page
    document.querySelector('#u_name').innerText = response.data[0].u_name
    document.querySelector('#u_phone').innerText = response.data[0].u_phone
    document.querySelector('#u_gender').innerText = response.data[0].u_gender
    
    let tbody = document.querySelector('table#user-reports-table tbody')
    response.data.forEach((item) => {
      // create the elements
      let tr = document.createElement('tr')
      let reported_at = document.createElement('td')
      let location = document.createElement('td')
      let content = document.createElement('td')
      let cryptid = document.createElement('td')
      
      // Add in your data to elements
      content.innerText = item.r_content
      reported_at.innerText = item.r_reported_at
      location.innerText = item.r_location
      cryptid.innerText = item.r_cryptid_id
      
      // append the TDs to the TR, the TR to the TBODY
      tr.appendChild(reported_at)
      tr.appendChild(location)
      tr.appendChild(content)
      tr.appendChild(cryptid)
      tbody.appendChild(tr)
      
    
    })
  })
  .catch((error) => {
    // handle error
    console.log(error);
  })
}