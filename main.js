
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  
  // if(description.length<10 || assignedTo.length>15){
  //   alert("Description can't be less than 10 words");
  // }
  
  if( !isNaN(description) || !isNaN(assignedTo)){
    alert("You can't put negative value")
  }
  else{
    const id = Math.floor(Math.random()*100000000);
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
  
  
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  
    fetchIssues();
    e.preventDefault();
  
  }
  document.getElementById('issueInputForm').reset();
  
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  if(currentIssue.status == 'Closed') {
    currentIssue.status = 'Open'
  } else {
    currentIssue.status = 'Closed';
  }
  console.log(currentIssue);
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}
function setStatusClosed(id){
  closeIssue(id);
}
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue=>issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  console.log(remainingIssues);
  
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  // console.log(issues.length)
    

if(issues) {
  document.getElementById('issue-counter').innerHTML= issues.length;
 
  document.getElementById('issue-remain').innerText =issues.filter(issue => issue.status == 'Open').length;
  // const openIssue = issues.filter(issue => issue.status == 'Open').length;
//   var openIssue = issues.filter(item => item.status == 'Open');
//   var openIssueLength = openIssue.length;
//   document.getElementById('issue-remain').innerHTML = openIssueLength;
  
  for (let i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
   
     
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 class="${status =='Closed' ? 'cls':'open'}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a onclick="setStatusClosed(${id})" class="btn ${
                                status === 'Closed' ? 'btn-success' : ' btn-warning'
                                }">${status === 'Closed' ? 'Open' : 'Close'}</a>
                              <a onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}

}