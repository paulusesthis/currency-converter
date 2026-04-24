const APIKEY = "gFO397I9a7aqiG6ngJ2HtecIRX8G05YK";
const form = document.getElementById("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);

    const date = formData.get("date");
    const from = formData.get("from");
    const to = formData.get("to");
    const amount = formData.get("amount");

    const myHeaders = new Headers();
    myHeaders.append("apikey", APIKEY);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    const url = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`;

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (!data.success) {
                document.getElementById("result").innerText =
                    data.error?.message || "Conversion failed";
                return;
            }

            const result = data.result;

            document.getElementById("result").innerText =
                `${amount} ${from} = ${result.toFixed(2)} ${to}`;
        })
});

//dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});