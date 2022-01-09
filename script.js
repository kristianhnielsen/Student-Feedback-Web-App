function buildTemplates(names) {
    for (let name of names) {
        let rootDiv = document.createElement('div');
        rootDiv.id = name + "-container";
        rootDiv.className = "template-container";
        let title = document.createElement('h3');
        title.innerHTML = name.toUpperCase(); 
        rootDiv.appendChild(title);
        
        let inputContainer = document.createElement('div');
        
        for (let i = 1; i < 4; i++){
            // create label element
            let label = document.createElement('label');
            label.setAttribute('for', name);
            label.innerHTML = i + ": ";
            
            // create input field
            let inputField = document.createElement('input');
            inputField.setAttribute("type", "text");
            // inputField.setAttribute("name", name);
            inputField.setAttribute("id", name + "-" + i);
            
            // create radio button
            let radioButton = document.createElement('input');
            radioButton.setAttribute("type", "radio");
            radioButton.setAttribute("name", name);
            radioButton.setAttribute("value", i);
            if (i == 1) {
                radioButton.setAttribute("checked", true);
            }
    
            // add to root element
            label.appendChild(inputField);
            label.appendChild(radioButton);
            inputContainer.appendChild(label);
        }
        rootDiv.appendChild(inputContainer);
        
        // append root element to section
        document.getElementById("feedback-template").appendChild(rootDiv);
    };
    
}

function getRadioButtonSelect(radioButtonName) {
    let rButtonCollection = document.getElementsByName(radioButtonName);
    for (let button of rButtonCollection) {
        if (button.checked == true){
            return button.value;
        }
    }
}

function getInputText(categoryName){
    return document.getElementById(categoryName + '-' + getRadioButtonSelect(categoryName)).value;
}

function deleteCheckedStudents() {
    // iterate through the children of #student-container, and return a list of names (Strings) for which the checkbox is checked
    let studentContainer = document.getElementById('student-container').childNodes;
    
    for (student of studentContainer) {
        let studentCheckbox = student.childNodes[0];
        if (studentCheckbox.checked == true) {
            student.remove();
        }
    }

}

function getCheckedStudentNames() {
    // iterate through the children of #student-container, and return a list of names (Strings) for which the checkbox is checked
    let studentContainer = document.getElementById('student-container').childNodes;
    let studentNames = [];

    for (student of studentContainer) {
        let studentCheckbox = student.childNodes[0];
        let studentLabel = student.childNodes[1];
        if (studentCheckbox.checked == true) {
            studentNames.push(studentLabel.innerHTML);
        }
    }
    return studentNames;
}

function clearOutput() {
    document.getElementById('output').value = "";
}

function generateFeedback() {
    let homeworkFeedback = getInputText('homework');
    let examFeedback = getInputText('exam');
    let classroomFeedback = getInputText('classroom');
    let encouragementFeedback = getInputText('encouragement');
    let studentNames = getCheckedStudentNames();

    if (studentNames.length == 0) {
        window.alert('Did you forget to select a student?');
    }

    if (document.getElementById('add-whitespace').checked == true){
        var whitespace = " ";
    } else {
        var whitespace = "";
    }
    

    deleteCheckedStudents();
    
    for (let studentName of studentNames) {
        let feedback = studentName + whitespace + homeworkFeedback + whitespace + examFeedback + whitespace + classroomFeedback + whitespace + encouragementFeedback;
        outputFeedback(feedback);
    } 

}

function outputFeedback(feedback) {
    let outputElement = document.getElementById('output');
    outputElement.value += feedback + '\n';

}

function getInput() {
    // split input on whitespace in order to add more names at the same time / copy/paste from an excel sheet of names
    let rawInput = document.getElementById("add-student-field").value;
    document.getElementById("add-student-field").value = "";
    return rawInput.split(" ");
}

function addStudent() {
    let inputStudentNames = getInput();
    let studentContainerElement = document.getElementById("student-container");
    
    for (let name of inputStudentNames) {
        // skips whitespace elements
        if (name == "" || name == " ") {
            continue;
        }

        // student container
        let studentElement = document.createElement('div');
        studentElement.className = "student-element";

        // student checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.id = name + '-checkbox';
        checkbox.setAttribute('for', name);
        checkbox.className = "student-checkbox";
        studentElement.appendChild(checkbox);
        
        // student label
        let label = document.createElement('label');
        label.setAttribute('for', name);
        label.className = "student-name";
        label.innerHTML = name;
        studentElement.appendChild(label);

        // add student element to main container
        studentContainerElement.appendChild(studentElement);
    }


}

window.onload = function() {
    buildTemplates(['homework', 'exam', 'classroom', 'encouragement']);
};