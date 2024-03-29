const quizHome = document.querySelector(".quiz");

const remove = function (hide) {
    hide.classList.add("hidden");
}
const add = function (show) {
    show.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#quiz").onclick = (e) => { //quiz for the div class and 
    	//widget_view does nothing still
        handle_app_widget_event(e);
        remove(quizHome);
    }
});

function handle_app_widget_event(e) {
    console.log("Button Pressed");
    console.log(e);
    const studentName = document.querySelector("#name");

    if (e.target.id == "mc-quiz") {
        update_view("#question-template");
    }
    if (e.target.id == "tf-quiz") {
        update_view("#question-template");
    }
}

function update_view(current_view) {
    const html_element = render_widget({}, current_view)
    document.querySelector("#widget_view").innerHTML = html_element;
}

const render_widget = (model, view) => {
    template_source = document.querySelector(view).innerHTML
    var template = Handlebars.compile(template_source);
    var html_widget_element = template(model)
    return html_widget_element
}
