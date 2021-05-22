var homeButton;
var workExpButtton;
var academicProjButton;
var aboutMeButton;
var buttonsGroup;
var features;

var academicProjectsAlphabetical;
var academicProjectsRelevance;
var academicProjectsDate;

var academicProjects = [
    {
        name: "Crowd Behavior Analysis",
        startDate: "September 2020",
        endDate:  "May 2021",
        bulletPoints: [
            "React web app development with a Node.js backend",
            "Data analysis based on JSON files using Python",
            "Data modeling using Python",
        ],
        relevance: 2
    },
    {
        name: "App Store Website",
        startDate: "April 2021",
        endDate:  "April 2021",
        bulletPoints: [
            "Front-end development in HTML CSS, JavaScript",
            "Back-end in Node.js and MongoDB",
            "Implementation of an account system to bookmark and review items",
            "View, search and filter different item categories by average rating and genre"
        ],
        relevance: 1
    },
    {
        name: "Healthcare Manager",
        startDate: "January 2020",
        endDate:  "January 2020",
        bulletPoints: [
            "Application development in C# for a health insurance company to store the medical records of displaced refugees residing in Lebanon",
            "Data storage in a local MySQL database and Cloud Firestore",
            "First place winner in the Humanitarian Engineering course at the American University of Beirut",
        ],
        relevance: 3
    },
];

var workExperienceAlphabetical;
var workExperienceRelevance;
var workExperienceDate;

var workExperience = [
    {
        position: "Software Engineer lntern",
        company: "American University of Beirut",
        startDate: "June 2020",
        endDate:  "August 2020",
        bulletPoints: [
            "Smart recycling biowaste bin prototyping using a Raspberry Pi for a local environmental company",
            "Data gathering and sensors control through Python scripts",
            "Data transmission and handling using GCP, Pub/Sub, Cloud Functions and Cloud SQL",
            "Android App development with a Firebase backend to send data and commands"
        ],
        relevance: 1
    },
    {
        position: "Alpha Foodie",
        company: "Video Editor",
        startDate: "August 2020",
        endDate:  "Present",
        bulletPoints: [
            "Video ideation, timelining, and production"
        ],
        relevance: 2
    }
];

window.onload = function() {
    homeButton         = document.getElementById('home');
    workExpButtton     = document.getElementById('workExp');
    academicProjButton = document.getElementById('academicProj');
    aboutMeButton      = document.getElementById('aboutMe');
    buttonsGroup       = document.getElementsByClassName('categorySelection');
    features           = document.getElementsByClassName('feature');
    homeButton.classList.add('categorySelection-selected');


    //Copy the data
    academicProjectsAlphabetical = JSON.parse(JSON.stringify(academicProjects));
    academicProjectsRelevance = JSON.parse(JSON.stringify(academicProjects));
    academicProjectsDate = JSON.parse(JSON.stringify(academicProjects));
    
    workExperienceAlphabetical = JSON.parse(JSON.stringify(workExperience));
    workExperienceRelevance = JSON.parse(JSON.stringify(workExperience));
    workExperienceDate = JSON.parse(JSON.stringify(workExperience));
    
    //Sort them
    academicProjectsAlphabetical.sort(function(a,b) {
        return a.name.localeCompare(b.name);
    });

    
    academicProjectsRelevance.sort(function(a,b) {
        return a.relevance - b.relevance;
    });
    
    
    academicProjectsDate.sort(function(a,b) {
        var dateA = new Date(a.startDate);
        var dateB = new Date(b.startDate);
        return dateB - dateA;
    });
    
    //Work Experiences
    workExperienceAlphabetical.sort(function(a,b) {
        return a.position.localeCompare(b.position);
    });

    
    workExperienceRelevance.sort(function(a,b) {
        return a.relevance - b.relevance;
    });
    
    
    workExperienceDate.sort(function(a,b) {
        var dateA = new Date(a.startDate);
        var dateB = new Date(b.startDate);
        return dateB - dateA;
    });

    addAcademicProjects();
    addWorkExp();
    
    //Changing pages---------------------------------------------------------------------
    for(let i = 0 ; i < buttonsGroup.length ; i++) {
        buttonsGroup[i].addEventListener('click', function() {
            switchPages(this.id);
        });
    }
    for(let i = 0 ; i < features.length ; i++) {
        features[i].addEventListener('click', function() {
            switchPages(this.getAttribute('name'));
        });
    }
    
    //-----------------------------------------------------------------------------------

    //Changing sorting
    document.getElementById('sortingValue2').onchange = addAcademicProjects;
    document.getElementById('sortingValue').onchange = addWorkExp;
}

function switchPages(clickedID) {
    var newDiv = clickedID + "Div";
    if(!document.getElementById(clickedID).classList.contains('categorySelection-selected')){
        var previousDiv = document.getElementsByClassName('categorySelection-selected')[0].id + "Div";
        document.getElementById(previousDiv).classList.add('page-hidden');

        let transitionPromise = new Promise(function(res,rej) {
            setTimeout(function() {
                document.getElementById(newDiv).style.display = "block";
                document.getElementById(previousDiv).style.display = "none";
                res("OK");
            }, 400);
        });

        transitionPromise.then(
            function(value) {
                document.getElementById(newDiv).classList.remove('page-hidden');
                document.getElementById(newDiv).classList.add('page-show');
            }
        )
        
        document.getElementsByClassName('categorySelection-selected')[0].classList.remove('categorySelection-selected');
        document.getElementById(clickedID).classList.add('categorySelection-selected');
    } else {
        return;
    }
}


function addAcademicProjects() {

    var sortingValue = document.getElementById('sortingValue2').value;
    console.log(sortingValue);
    document.getElementById('academicProjects').innerHTML = "";

    var currentSorting;

    if(sortingValue == "relevance"){
        currentSorting = academicProjectsRelevance;
    }else if(sortingValue == "date"){
        currentSorting = academicProjectsDate;
    }else {
        currentSorting = academicProjectsAlphabetical;
    }

    for(let i = 0 ; i < currentSorting.length; i++){

        var academicsDiv = document.createElement('div');
        academicsDiv.classList.add('experience');

        var projectName = document.createElement('h2');
        projectName.classList.add('experienceCompany');
        projectName.innerHTML = currentSorting[i].name;

        var projectDate = document.createElement('h4');
        projectDate.classList.add('experienceDate');
        var startDate = currentSorting[i].startDate;
        var endDate = currentSorting[i].endDate;
        if (startDate == endDate) {
            projectDate.innerHTML = startDate;
        } else {
            projectDate.innerHTML = startDate + " - " + endDate;
        }

        var bulletPoints = document.createElement('ul');
        
        for(let j = 0 ; j < currentSorting[i].bulletPoints.length ; j++){
            var bulletPoint = document.createElement('li');
            bulletPoint.innerHTML = currentSorting[i].bulletPoints[j];
            bulletPoints.appendChild(bulletPoint);
        }

        academicsDiv.appendChild(projectName);
        academicsDiv.appendChild(projectDate);
        academicsDiv.appendChild(bulletPoints);

        document.getElementById('academicProjects').appendChild(academicsDiv);
    }
}


function addWorkExp() {

    var sortingValue = document.getElementById('sortingValue').value;
    console.log(sortingValue);
    
    document.getElementById('workProjects').innerHTML = "";

    var currentSorting;

    if(sortingValue == "relevance"){
        currentSorting = workExperienceRelevance;
    }else if(sortingValue == "date"){
        currentSorting = workExperienceDate;
    }else {
        currentSorting = workExperienceAlphabetical;
    }

    for(let i = 0 ; i < currentSorting.length; i++){

        var experienceDiv = document.createElement('div');
        experienceDiv.classList.add('experience');

        var companyName = document.createElement('h2');
        companyName.classList.add('experienceCompany');
        companyName.innerHTML = currentSorting[i].company;

        var positionName = document.createElement('h2');
        positionName.classList.add('experienceCompany');
        positionName.innerHTML = currentSorting[i].position;

        var experienceTime = document.createElement('h4');
        experienceTime.classList.add('experienceDate');
        var startDate = currentSorting[i].startDate;
        var endDate = currentSorting[i].endDate;
        if (startDate == endDate) {
            experienceTime.innerHTML = startDate;
        } else {
            experienceTime.innerHTML = startDate + " - " + endDate;
        }

        var bulletPoints = document.createElement('ul');
        
        for(let j = 0 ; j < currentSorting[i].bulletPoints.length ; j++){
            var bulletPoint = document.createElement('li');
            bulletPoint.innerHTML = currentSorting[i].bulletPoints[j];
            bulletPoints.appendChild(bulletPoint);
        }

        experienceDiv.appendChild(positionName);
        experienceDiv.appendChild(companyName);
        experienceDiv.appendChild(experienceTime);
        experienceDiv.appendChild(bulletPoints);

        document.getElementById('workProjects').appendChild(experienceDiv);
    }
}