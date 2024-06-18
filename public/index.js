document.getElementById('issueDiplomaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value;
    const degree = document.getElementById('degree').value;
    const dateOfGraduation = document.getElementById('dateOfGraduation').value;

    const response = await fetch('/issueDiploma', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentName, degree, dateOfGraduation }),
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('result').textContent = `Diploma issued successfully! Token: ${data.token}`;
    } else {
        document.getElementById('result').textContent = 'Error issuing diploma.';
    }
});

document.getElementById('verifyDiplomaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = document.getElementById('token').value;

    const response = await fetch(`/verifyDiploma/${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        document.getElementById('result').textContent = `Diploma Verified! Student Name: ${data.studentName}, Degree: ${data.degree}, Date of Graduation: ${data.dateOfGraduation}`;
    } else {
        document.getElementById('result').textContent = 'Error verifying diploma.';
    }
});
