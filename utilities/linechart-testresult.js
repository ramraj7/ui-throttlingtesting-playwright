const fs = require('fs').promises;

(async () => {
  const rawData = await fs.readFile('./performance-testresult/multipage-performance-results.json', 'utf8');
  const results = JSON.parse(rawData);

  // Extract labels and convert durations to numbers
  const labels = results.steps.map(step => step.step);
  const times = results.steps.map(step => parseFloat(step.time));

  const html = `
    <!DOCTYPE html>
    <html>
    <body>
      <canvas id="myChart"></canvas>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ${JSON.stringify(labels)},
            datasets: [{
              label: 'Step Duration (ms)',
              data: ${JSON.stringify(times)},
              fill: false,
              borderColor: 'rgb(5, 17, 17)',
              pointRadius: 5
            }]
          },
          options: { 
            scales: { 
              x: { 
                ticks: { font: { size: 10 } } // Adjust font size for x-axis
              },
              y: { 
                ticks: { font: { size: 10 } } // Adjust font size for y-axis
              } 
            } 
          }
        });
      </script>
    </body>
    </html>`;
  await fs.writeFile('./htmlchartcomparison/flow-chart.html', html);
  console.log('Open flow-chart.html in a browser');
})();