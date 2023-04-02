export const drawWaveForm = (
    audioBuffer,
    canvas,
    context,
    color
  ) => {
    const canvasWidth = Math.floor(canvas.offsetWidth);
    const canvasHeight = Math.floor(canvas.offsetHeight);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    if (!context) return;

    const lineWidth = 1;
    const lineColor = color;
    const nrOfLinesPerPixel = 8; // This is our resolution, tweak for performance vs accuracy
    const nrOfLines = (nrOfLinesPerPixel * canvasWidth) / lineWidth;
    const lineGap = canvasWidth / nrOfLines;
    const leftChannelData = audioBuffer.getChannelData(0); // Float32Array describing left channel
    const sizeOfABucket = Math.floor(leftChannelData.length / nrOfLines); // Nr of data points to calculate each line
    const nrOfBuckets = Math.floor(leftChannelData.length / sizeOfABucket);

    let drawData = new Float64Array(nrOfLines);
    let maxDataValue = -1e4;

    // Uncomment to see how your buckets change according to lineWidth and nrOfLinesPerPixel
    // console.log({
    //   lineWidth,
    //   nrOfLinesPerPixel,
    //   nrOfLines,
    //   lineGap,
    //   dataLength: leftChannelData.length,
    //   sizeOfABucket,
    //   nrOfBuckets,
    // });

    // Go through all buckets and calculate the mean value in each bucket. Thereafter normalize the data.
    //
    // Raw Data:     0.25 0.234 0.146 0.13 0.37   0.267 0.123 0.44 0.32 0.21  ...
    // Buckets:     └──────── Bucket 0 ────────┘ └──────── Bucket 1 ────────┘
    //                          │                            │
    // Mean:                  0.166                        0.272              ...
    //                          │                            │
    // Normalized:            0.49                         0.66               ...
    //
    for (let bucketIndex = 0; bucketIndex < nrOfBuckets; bucketIndex++) {
      for (
        let bucketDataIndex = 0;
        bucketDataIndex < sizeOfABucket;
        bucketDataIndex++
      ) {
        const dataIndex = bucketIndex * sizeOfABucket + bucketDataIndex;
        // Add upp every value in the bucket
        drawData[bucketIndex] += Math.abs(leftChannelData[dataIndex]);

        // Save the greatest value
        if (leftChannelData[dataIndex] > maxDataValue) {
          maxDataValue = leftChannelData[dataIndex];
        }
      }

      // Get mean value of each bucket
      drawData[bucketIndex] /= sizeOfABucket;
    }

    // Because we have so much zero or near zero values in the audio data, the resulting averages of the data points are very small.
    // To make sure this visualization works for all audio files, we need to normalize the data.
    // Normalize the data --> change the scale of the data so that the loudest sample measure as maxDataValue.
    const multiplier = Math.pow(Math.max(...drawData), -maxDataValue);
    drawData = drawData.map((n) => n * multiplier);

    context.strokeStyle = lineColor;
    context.lineWidth = lineWidth;
    context.globalCompositeOperation = "multiply"; // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.save();
    // Save current state of canvas before we translate, scale and draw, and restore once we're done

    // Draw in the vertical middle of the canvas and scale all values (-1 to 1) to fit the canvas height
    context.translate(0, canvasHeight / 2);
    context.scale(1, canvasHeight / 2);
    // Draw all our lines
    context.beginPath();
    for (let i = 0; i < drawData.length; i++) {
      const x = i * lineGap;
      const y = drawData[i];
      context.moveTo(x, y);
      context.lineTo(x, y * -1);
    }
    context.stroke();

    context.restore();
  };
  export const drawMiddleLine = (canvas, context, color) => {
    const canvasWidth = Math.floor(canvas.clientWidth);
    const canvasHeight = Math.floor(canvas.clientHeight);
    context.strokeStyle = color;
    // Draw a line through the middle
    context.lineWidth = 0.5 / canvasHeight;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(canvasWidth, 0);
    context.stroke();
  };