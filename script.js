const form = document.getElementById("regForm");
const submitBtn = document.getElementById("submitBtn");
const topError = document.getElementById("topError");
const successMsg = document.getElementById("successMsg");

const emailBlocked = ["tempmail.com"];

const countryCodes = {
    India: "+91",
    USA: "+1",
    UK: "+44",
    Canada: "+1",
    Australia: "+61",
    Germany: "+49",
    France: "+33",
    Japan: "+81"
};

// Country code update
document.getElementById("country").addEventListener("change", function () {
    document.getElementById("countryCode").value = countryCodes[this.value] || "";
});

// Password strength
document.getElementById("password").addEventListener("input", function () {
    let val = this.value;
    let strength = document.getElementById("strength");

    strength.className = "strength";

    if (val.length < 6) {
        strength.innerText = "Weak password";
        strength.classList.add("weak");
    } else if (val.match(/[A-Z]/) && val.match(/[0-9]/) && val.match(/[@$!%*?&]/)) {
        strength.innerText = "Strong password";
        strength.classList.add("strong");
    } else {
        strength.innerText = "Medium password";
        strength.classList.add("medium");
    }
});

// ================= VALIDATION FUNCTIONS =================

function fnameCheck() {
    fnameErr.innerText = fname.value ? "" : "First name required";
    return !!fname.value;
}

function lnameCheck() {
    lnameErr.innerText = lname.value ? "" : "Last name required";
    return !!lname.value;
}

function emailCheck() {
    let e = email.value;
    if (!e) {
        emailErr.innerText = "Email required";
        return false;
    }
    if (emailBlocked.some(d => e.includes(d))) {
        emailErr.innerText = "Disposable email not allowed";
        return false;
    }
    emailErr.innerText = "";
    return true;
}

function phoneCheck() {
    phoneErr.innerText = phone.value.length >= 10 ? "" : "Invalid phone number";
    return phone.value.length >= 10;
}

function genderCheck() {
    genderErr.innerText = gender.value ? "" : "Gender required";
    return !!gender.value;
}

function passwordCheck() {
    if (password.value !== confirmPassword.value || !password.value) {
        confirmErr.innerText = "Passwords do not match";
        return false;
    }
    confirmErr.innerText = "";
    return true;
}

function termsCheck() {
    termsErr.innerText = terms.checked ? "" : "Accept terms";
    return terms.checked;
}

// ================= FORM SUBMIT =================

form.addEventListener("submit", function (e) {
    e.preventDefault();

    topError.innerText = "";
    successMsg.innerText = "";

    let missing = [];

    if (!fnameCheck()) missing.push("First Name");
    if (!lnameCheck()) missing.push("Last Name");
    if (!emailCheck()) missing.push("Email");
    if (!phoneCheck()) missing.push("Phone");
    if (!genderCheck()) missing.push("Gender");
    if (!passwordCheck()) missing.push("Password");
    if (!termsCheck()) missing.push("Terms & Conditions");

    if (missing.length > 0) {
        topError.innerText =
            "Please fill the following fields: " + missing.join(", ");
        return;
    }

    // ✅ SUCCESS
    successMsg.innerText = "Registration Successful!";
    form.reset();
    document.getElementById("strength").innerText = "";
});
