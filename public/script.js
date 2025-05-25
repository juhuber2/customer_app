  const form = document.getElementById('kundenForm'); // Das Formular mit der ID "kundenForm" wird ausgewählt und in der Konstante "form" gespeichert.
	 const tabelle = document.getElementById('kundenTabelle'); // Die Tabelle mit der ID "kundenTabelle" wird ausgewählt und in der Konstante "tabelle" gespeichert.
	 
	 form.addEventListener('submit', async (e) => {
		e.preventDefault(); // Verhindert die Standardaktion des Formulars (SeitenNeuladung)
		
	 const formData = new FormData(form); // FormData ist ein Web-API, das es ermöglicht, Formulardaten zu sammeln und zu verarbeiten.
	 const data = Object.fromEntries(formData.entries()); // Die Formulardaten werden in ein Objekt umgewandelt, das die Eingabewerte enthält.
	 // Object.fromEntries() ist eine Methode, die ein Array von Schlüssel-WertPaaren in ein Objekt umwandelt.
	 
	 await fetch('/api/kunden', {
		 method: 'POST',
		 headers: { 'Content-Type': 'application/json' },
		 body: JSON.stringify(data)
		 });
 
	// Sendet die Formulardaten an den Server
	// mit der Methode POST. Die Daten werden als JSON-String gesendet.
 
	form.reset(); // Setzt das Formular zurück, nachdem die Daten gesendet wurden.
	// Das bedeutet, dass alle Eingabefelder im Formular geleert werden.
 
	ladeKunden(); // Lädt die Kundenliste neu, um die neuen Daten anzuzeigen.
	});
 
	async function ladeKunden() {
	const suchbegriff = document.getElementById('sucheInput').value; // Der Suchbegriff wird aus dem Eingabefeld mit der ID "sucheInput" gelesen.
 
	const res = await fetch(`/api/kunden?
	search=${encodeURIComponent(suchbegriff)}`); // Sendet eine GET-Anfrage an den Server, um die Kundenliste zu laden.

	 const kunden = await res.json(); //
	 console.log(kunden);
	 tabelle.innerHTML = kunden.map(k => `
	 <tr>
	 <td>${k.nachname}</td>
	 <td>${k.vorname}</td>
	 <td>${k.email}</td>
	 </tr>
	 `).join('');
	 }
// Die Kundenliste wird in die Tabelle eingefügt. kunden.map() ist eine
//Methode, die ein neues Array erstellt, indem sie eine Funktion auf jedes Element
//des Arrays anwendet. join('') verbindet die Elemente des Arrays zu einem String.

	 function showEntireList() {
	 document.getElementById('sucheInput').value = ''; // Setzt das Eingabefeld für die Suche zurück.
	 ladeKunden(); // Lädt die gesamte Kundenliste neu.
	 }
	 ladeKunden();
 

