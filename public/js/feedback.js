// vis feedback til bruker
const showFeedback = (status, code, element, refresh) => {
    // fjern gamle statuskode classes
    const statusClasses = ['userErr', 'serverErr', 'ok'];
    statusClasses.forEach(statusClass => {
        element.classList.remove(statusClass);
    });

    // legg til status tekst i feedback-feltet
    element.innerText = status;

    // legg til statuskode class, og vis element
    element.classList.add(code);
    element.classList.remove('hidden');

    // hvis statuskode er "ok" og refresh er true, refresh siden
    if (code === 'ok' && refresh) {
        window.location = '/user';
    };
}