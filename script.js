

var arr_notes = [];

backup_end_check_date();

function create_note(note, date, time) {
    var note = {
        note: note,
        date: date,
        time: time
    }
    return note;
}

function backup_end_check_date() {

    var notes_backup = JSON.parse(localStorage.getItem('notes_arr'));
    document.getElementById('total_notse').innerHTML = "Total notes: " + arr_notes.length;

    if (notes_backup != null) {
        arr_notes = notes_backup;
    }

    for (var i = 0; i < arr_notes.length; i++) {
        noteTemplate(arr_notes[i].note, arr_notes[i].date, arr_notes[i].time);

        var input_date = document.forms["add_notse"]["date_input"];
        input_date.value = arr_notes[i].date;
        check_exp_date(input_date);
    }
    var input_date = document.forms["add_notse"]["date_input"];
    input_date.valueAsDate = new Date();
}

function check_exp_date(input_date) {

    var div_exp = document.getElementById('temp_exp');

    if (input_date.valueAsDate < new Date()) {
        div_exp.innerHTML = "Expired note!";
    }

    else {
        div_exp.innerHTML = "";
    }
    div_exp.id = "exp";
}

function add_note() {
    var note = document.forms["add_notse"]["new_not_textarea"].value;
    var date = document.forms["add_notse"]["date_input"].value;
    var time = document.forms["add_notse"]["time_input"].value;

    var button_save = document.getElementById('button_save');

    if (button_save != undefined) {
        document.getElementById('eror_msg').innerHTML = "There is note in editing - save it and try again!";

    }

    else {

        if (note == "") {
            document.getElementById('eror_msg').innerHTML = "Please fill a note!";
        }

        else {

            if (date == "") {
                document.getElementById('eror_msg').innerHTML = "Please fill a date!";
            }

            else {

                if (check_note_on_arry_notse(note, date, time) != false) {
                    document.getElementById('eror_msg').innerHTML = "There is existing the same note at this date end time on the borad!";
                }

                else {
                    arr_notes.push(create_note(note, date, time));
                    localStorage.setItem('notes_arr', JSON.stringify(arr_notes));
                    noteTemplate(note, date, time);

                    var input_date = document.forms["add_notse"]["date_input"];
                    check_exp_date(input_date);
                    

                    document.forms["add_notse"]["new_not_textarea"].value = "";
                    input_date.valueAsDate = new Date();
                    document.forms["add_notse"]["time_input"].value = "";
                    document.getElementById('eror_msg').innerHTML = "";
                }

            }

        }

    }
   
}

function noteTemplate(note, date, time) {

    var arr_notes_span = document.getElementById('arr_notes_span');

    var parent_div = document.createElement('div');
    parent_div.id = "note_bg";
    parent_div.className = "note_bg";

    var button_rmove = document.createElement('button');
    button_rmove.type = "button";
    button_rmove.className = "fas fa-trash-alt button_rmove";
    button_rmove.onclick = remove_note;

    var button_edit = document.createElement('button');
    button_edit.type = "button";
    button_edit.className = "fas fa-edit button_edit";
    button_edit.onclick = edit_note;

    var div_exp = document.createElement('div');
    div_exp.id = "temp_exp";
    div_exp.className = "exp";

    var div_note_text = document.createElement('div');
    div_note_text.className = "note_text";
    div_note_text.append(note);

    var div_date_text = document.createElement('div');
    div_date_text.className = "date_text";
    div_date_text.append(date);

    var div_time_text = document.createElement('div');
    div_time_text.className = "time_text";
    div_time_text.append(time);

    parent_div.append(button_rmove);
    parent_div.append(button_edit);
    parent_div.append(div_exp);
    parent_div.append(div_note_text);
    parent_div.append(div_date_text);
    parent_div.append(div_time_text);
    arr_notes_span.append(parent_div);

    document.getElementById('total_notse').innerHTML = "Total notes: " + arr_notes.length;
}

function clear_note() {
    var input_date = document.forms["add_notse"]["date_input"];

    document.forms["add_notse"]["new_not_textarea"].value = "";
    input_date.valueAsDate = new Date();
    document.forms["add_notse"]["time_input"].value = "";
    document.getElementById('eror_msg').innerHTML = "";
}

function clear_all() {
    var button_save = document.getElementById('button_save');

    if (button_save != undefined) {
        window.location = "#title_page";
        document.getElementById('eror_msg').innerHTML = "There is note in editing - save it and try again!";
    }

    else {
        var warning = confirm("Are you sure you want to delete all notes?");

        if (warning == true) {
            clear_note();
            document.getElementById('arr_notes_span').innerHTML = "";
            arr_notes = [];
            localStorage.setItem('notes_arr', JSON.stringify(arr_notes));
            document.getElementById('total_notse').innerHTML = "Total notes: " + arr_notes.length;
        }

    }

}

function check_note_on_arry_notse(note_text, date_text, time_text) {

    for (var i = 0; i < arr_notes.length; i++) {

        if (note_text == arr_notes[i].note && date_text == arr_notes[i].date) {

            if (time_text == "" || time_text == arr_notes[i].time) {
                return arr_notes[i];
            }

        }

    }
    return false;
}

function remove_note() {

    var button_save = document.getElementById('button_save');

    if (button_save != undefined) {
        window.location = "#title_page";
        document.getElementById('eror_msg').innerHTML = "Unable to delete note while note is beimg edited!";
    }

    else {

        this.parentElement.parentElement.removeChild(this.parentElement);

        var note_text = this.parentElement.children[3].innerHTML;
        var date_text = this.parentElement.children[4].innerHTML;
        var time_text = this.parentElement.children[5].innerHTML;
        var index_note = arr_notes.indexOf(check_note_on_arry_notse(note_text, date_text, time_text));

        arr_notes.splice(index_note, 1);
        localStorage.setItem('notes_arr', JSON.stringify(arr_notes));
        document.getElementById('total_notse').innerHTML = "Total notes: " + arr_notes.length;
        document.getElementById('eror_msg').innerHTML = "";
    }

}

function edit_note() {

    document.getElementById('eror_msg').innerHTML = "";

    var button_save = document.getElementById('button_save');

    if (button_save != undefined) {
        window.location = "#title_page";
        document.getElementById('eror_msg').innerHTML = "There is note in editing - save it and try again!";
    }

    else {
        window.location = "#title_page";
        var note_text = this.parentElement.children[3].innerHTML;
        var date_text = this.parentElement.children[4].innerHTML;
        var time_text = this.parentElement.children[5].innerHTML;

        document.forms["add_notse"]["new_not_textarea"].value = note_text;
        document.forms["add_notse"]["date_input"].value = date_text;
        document.forms["add_notse"]["time_input"].value = time_text;

        var div_save_and_cancel = document.getElementById('div_save_and_cancel');

        var button_save = document.createElement('button');
        button_save.type = "button";
        button_save.id = "button_save";
        button_save.className = "btn btn-danger button_save";
        button_save.innerHTML = "Save";
        div_save_and_cancel.append(button_save);
        button_save.onclick = save_note;

        var button_cancel = document.createElement('button');
        button_cancel.type = "button";
        button_cancel.className = "btn btn-danger button_cancel";
        button_cancel.innerHTML = "Cancel";
        div_save_and_cancel.append(button_cancel);
        button_cancel.onclick = cancel_note;

        this.parentElement.id = "edit";
    }

}

function save_note() {
    var id_edit = document.getElementById('edit');

    var note_temp = id_edit.children[3].innerHTML;
    var date_temp = id_edit.children[4].innerHTML;
    var time_temp = id_edit.children[5].innerHTML;

    var note = document.forms["add_notse"]["new_not_textarea"].value;
    var date = document.forms["add_notse"]["date_input"].value;
    var time = document.forms["add_notse"]["time_input"].value;


    if (note == "") {
        document.getElementById('eror_msg').innerHTML = "Please fill a note!";
    }

    else {

        if (date == "") {
            document.getElementById('eror_msg').innerHTML = "Please fill a date!";
        }

        else {

            if (check_note_on_arry_notse(note, date, time) != false) {
                document.getElementById('eror_msg').innerHTML = "Nothing changed!";
            }

            else {

                id_edit.children[3].innerHTML = note;
                id_edit.children[4].innerHTML = date;
                id_edit.children[5].innerHTML = time;

                var index_note = arr_notes.indexOf(check_note_on_arry_notse(note_temp, date_temp, time_temp));

                arr_notes[index_note].note = note;
                arr_notes[index_note].date = date;
                arr_notes[index_note].time = time;
                localStorage.setItem('notes_arr', JSON.stringify(arr_notes));

                var input_date = document.forms["add_notse"]["date_input"];
                id_edit.children[2].id = "temp_exp";
                check_exp_date(input_date);

                var input_date = document.forms["add_notse"]["date_input"];
                document.forms["add_notse"]["new_not_textarea"].value = "";
                input_date.valueAsDate = new Date();
                document.forms["add_notse"]["time_input"].value = "";

                this.parentElement.removeChild(this.parentElement.children[1]);
                this.parentElement.removeChild(this);

                document.getElementById('eror_msg').innerHTML = "";
                id_edit.id = "note_bg";
            }

        }

    }

}

function cancel_note() {
    var id_edit = document.getElementById('edit');
    var input_date = document.forms["add_notse"]["date_input"];
    
    document.forms["add_notse"]["new_not_textarea"].value = "";
    input_date.valueAsDate = new Date();
    document.forms["add_notse"]["time_input"].value = "";

    this.parentElement.removeChild(this.parentElement.children[0]);
    this.parentElement.removeChild(this);

    document.getElementById('eror_msg').innerHTML = "";
    id_edit.id = "note_bg";
}


