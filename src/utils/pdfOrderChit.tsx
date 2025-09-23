import { IOrderDetailsResponseBody } from '@/feature/redux_models/orders_model';
import { useAppSelector } from '@/feature/stateHooks';
import Share from 'react-native-share';
import { generatePDF } from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';

export const pdfOrderChit = async (data: any) => {
  console.log('ssss');
  // const userData = useAppSelector(state => state.auth);
  const htmlContent = `
  <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
      <div style="max-width: 400px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="font-size: 36px; font-weight: bold; margin: 0; color: #333;">
                </h1>
          </div>

          <!-- Restaurant Info -->
          <div style="text-align: center; margin-bottom: 30px; color: #666;">
              <div style="margin-bottom: 10px; display: flex; align-items: center; justify-content: center;">
                  <span style="margin-right: 8px; font-size: 18px;">📍</span>
                  <span style="font-size: 16px;"></span>
              </div>
              <div style="display: flex; align-items: center; justify-content: center;">
                  <span style="margin-right: 8px; font-size: 18px;">📞</span>
                  <span style="font-size: 16px;"></span>
              </div>
          </div>

          <!-- Divider -->
          <div style="height: 1px; background-color: #ddd; margin: 30px 0;"></div>

          <!-- Invoice Details -->
          <div style="display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 16px;">
              <div>
                  // <div style="margin-bottom: 8px;">
                  //     <strong>Invoice No :</strong> #133494
                  // </div>
                  <div>
                      <strong>Order ID :</strong> ${data?.unique_id}
                  </div>
              </div>
              <div style="text-align: right;">

              </div>
          </div>

          <!-- Divider -->
          <div style="height: 1px; background-color: #ddd; margin: 30px 0;"></div>

          <!-- Order Items -->
          <div style="margin-bottom: 30px;">

          <!-- Divider -->
          <div style="height: 2px; background-color: #333; margin: 30px 0;"></div>

          <!-- Total -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
              <span style="font-size: 24px; font-weight: bold;">Total</span>
              <span style="font-size: 24px; font-weight: bold;">Rs. ${
                data?.total ? parseFloat(data.total).toLocaleString() : '0'
              }</span>
          </div>

          <!-- Dotted Divider -->
          <div style="border-bottom: 2px dotted #ccc; margin: 30px 0;"></div>

          <!-- Thank You Message -->
          <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="font-size: 24px; font-weight: bold; margin: 0 0 10px 0; letter-spacing: 2px;">THANK YOU!</h2>
              <p style="font-size: 16px; margin: 0; color: #666;">order again with</p>
          </div>

          <!-- XEAT Logo -->
          <div style="text-align: center; margin-bottom: 30px;">
              <div style="font-size: 36px; font-weight: bold; color: #333; margin-bottom: 10px;">
                  <span style="color: #ff6b35;">✓</span>XEAT
              </div>
          </div>

          <!-- App Download Section -->
          <div style="display: flex; justify-content: center; align-items: center; gap: 10px;">
              <div style="background-color: #000; color: white; padding: 8px 12px; border-radius: 20px; font-size: 12px; display: flex; align-items: center; gap: 5px;">
                  <span>🍎</span>
                  <div>
                      <div style="font-size: 10px;">Download on the</div>
                      <div style="font-weight: bold;">App Store</div>
                  </div>
              </div>

              <div style="border: 2px solid #333; padding: 15px; border-radius: 8px;">
                  <div style="font-size: 12px; font-weight: bold; text-align: center; margin-bottom: 5px;">QR CODE</div>
                  <div style="width: 60px; height: 60px; background-color: #333; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; text-align: center;">
                      SCAN<br>ME
                  </div>
              </div>

              <div style="background-color: #000; color: white; padding: 8px 12px; border-radius: 20px; font-size: 12px; display: flex; align-items: center; gap: 5px;">
                  <span>🤖</span>
                  <div>
                      <div style="font-size: 10px;">GET IT ON</div>
                      <div style="font-weight: bold;">Google Play</div>
                  </div>
              </div>
          </div>

          <!-- Bottom Dotted Divider -->
          <div style="border-bottom: 2px dotted #ccc; margin: 30px 0 0 0;"></div>
      </div>
  </body>
  `;
  const options = {
    html: htmlContent,
    fileName: 'invoice',
    directory: 'cache',
  };

  const file = await generatePDF(options);

  console.log('eee', file.filePath);

  const pdfBase64 = await RNFS.readFile(file.filePath, 'base64');

  const pdfUri = `file://${file.filePath}`;

  console.log('sswww', pdfBase64);
  try {
    // await Share.open({
    //   urls: [`data:application/pdf;base64,` + pdfBase64],
    // });
    await Share.open({
      title: 'Share PDF',
      url: pdfUri, // 🔥 must include file://
      //   type: 'application/pdf',
    });
  } catch (err) {
    console.log('Error =>', err);
  }
};
