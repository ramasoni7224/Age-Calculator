document.addEventListener('DOMContentLoaded', function () {
    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculate-btn');
    const results = document.getElementById('results');
    const toggle = document.getElementById('toggle-mode');
    const body = document.body;

    // Set max date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    birthdateInput.max = `${yyyy}-${mm}-${dd}`;

    // Enable/disable button
    birthdateInput.addEventListener('change', function () {
        calculateBtn.disabled = !this.value;
    });

    calculateBtn.addEventListener('click', calculateAge);

    // Light/Dark toggle
    toggle.addEventListener('change', () => {
        body.classList.toggle('dark');
    });

    // Age calculation with animation
    function calculateAge() {
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();
        if (birthdate > today) {
            alert('Please enter a valid birth date (not in the future)');
            return;
        }

        const years = getYears(birthdate, today);
        const months = getMonths(birthdate, today) % 12;
        const days = getDays(birthdate, today);

        const totalMonths = getMonths(birthdate, today);
        const totalWeeks = Math.floor(getDays(birthdate, today) / 7);
        const totalDays = getDays(birthdate, today);
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        const totalSeconds = totalMinutes * 60;

        function formatNumber(num) { return num.toLocaleString(); }

        const resultsData = [
            { id: 'years-months-days', value: `${years} years ${months} months ${days} days` },
            { id: 'months-days', value: `${formatNumber(totalMonths)} months ${days} days` },
            { id: 'weeks-days', value: `${formatNumber(totalWeeks)} weeks ${days} days` },
            { id: 'days', value: `${formatNumber(totalDays)} days` },
            { id: 'hours', value: `${formatNumber(totalHours)} hours` },
            { id: 'minutes', value: `${formatNumber(totalMinutes)} minutes` },
            { id: 'seconds', value: `${formatNumber(totalSeconds)} seconds` },
        ];

        results.style.display = 'block';

        resultsData.forEach((item, index) => {
            const el = document.getElementById(item.id);
            el.textContent = item.value;
            el.parentElement.classList.remove('show');
            setTimeout(() => {
                el.parentElement.classList.add('show');
            }, index * 150);
        });
    }

    function getYears(d1, d2) { return d2.getFullYear() - d1.getFullYear(); }
    function getMonths(d1, d2) { return (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth()); }
    function getDays(d1, d2) { return Math.floor(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24)); }
});
