export async function handleSubmit(event, url = null) {
    event.preventDefault(); // Prevent page reload

    // Get the URL input value
    let urlInput = url || document.getElementById('urlInput').value;

    if (!urlInput) {
        alert("Please enter a URL!");
        return;
    }

    console.log("📤 Sending URL to server:", urlInput);

    try {
        // Sending the URL to the server
        const response = await fetch('http://localhost:8000/analyze-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();
        console.log("📥 Server response:", data);

        // Displaying the result in the HTML
        if (data.error) {
            document.getElementById('results').innerText = `Error: ${data.error}`;
        } else {
            document.getElementById('results').innerText = `Analysis Result: ${JSON.stringify(data)}`;
        }
    } catch (error) {
        console.error("❌ Error fetching data:", error);
        document.getElementById('results').innerText = "Failed to get analysis.";
    }
}
