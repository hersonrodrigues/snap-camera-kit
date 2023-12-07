import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzAxOTY2Njg1LCJzdWIiOiI0NmVmMzEyZS1hYmQzLTQ1NzUtYjZlOC1iMTViYjQzY2FhM2J-U1RBR0lOR35jN2M2YWE0ZC1jZTNhLTRhODktODc4MS05NjczZjhhYjdkNDgifQ.XTLV196Zqe9Hai7-f6rMD_RnrJkwCMoqy9N3IsVSynM'
  });

  const liveRenderTarget = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement;
  const session = await cameraKit.createSession({ liveRenderTarget });
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLensGroups(
    ['e9e8c227-b8e5-4eb5-871b-22568078272a']
  );

  const min = 0
  const max = lens.lenses.length;
  const rand = Math.floor(Math.random() * (max - min + 1) + min)

  // Create a select element (ComboBox)
  const comboBox = document.createElement('select');
  comboBox.id = 'lensComboBox'; // Set an ID for the ComboBox

  // Populate options based on the loaded lenses
  lens.lenses.forEach((lens, index) => {
    const option = document.createElement('option');
    option.value = index.toString(); // Set the value to the index or any unique identifier
    option.text = lens.name
    comboBox.appendChild(option);
  });

  // Append the ComboBox to the 'workArea' element
  (document.getElementById('work-area')  as HTMLCanvasElement).appendChild(comboBox);

  // Event listener for ComboBox selection change
  comboBox.addEventListener('change', async (event) => {
    if (event != null && event.target != null && event.target.value != null) {
      const selectedIndex = event.target.value;
      await session.applyLens(lens.lenses[selectedIndex]);
    }
  });

  
  comboBox.value = rand.toString();
  await session.applyLens(lens.lenses[rand]);
})();