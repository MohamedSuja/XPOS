import store from '@/feature/store';
import { generatePDF } from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const pdfInvoice = async (data: any) => {
  const userData = store.getState().auth;

  const htmlContent = `
       <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 40px 20px;">
  
  <!-- Header Section -->
  <div style="text-align: center; margin-bottom: 50px;">
    <h1 style="font-size: 64px; font-weight: 400; margin: 0 0 40px 0; letter-spacing: -1px;">${
      userData?.userName
    }</h1>
    
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px; font-size: 28px; color: #333;">
      <div style="display: flex; align-items: center; gap: 15px;">
        <svg style="width: 32px; height: 32px; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span>${userData?.address}</span>
      </div>
      
      <div style="display: flex; align-items: center; gap: 15px;">
        <svg style="width: 32px; height: 32px; flex-shrink: 0;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span>${userData?.contactNo}</span>
      </div>
    </div>
  </div>
  
  <!-- Date Section -->
  <div style="border-bottom: 2px solid #000; padding-bottom: 20px;">
    <div style="font-size: 32px; color: #000;">Date :  ${
      data?.date_range?.start_date == data?.date_range?.end_date
        ? data?.date_range?.start_date
        : data?.date_range?.start_date + ` - ` + data?.date_range?.end_date
    }</div>
  </div>
  
  <!-- Table Section -->
  <div style="margin-bottom: 10px;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 2px solid #000;">
          <th style="text-align: left; font-size: 32px; font-weight: 400; padding: 20px 0; color: #000;">Item</th>
          <th style="text-align: left; font-size: 32px; font-weight: 400; padding: 20px 0; color: #000;">Qty</th>
          <th style="text-align: right; font-size: 32px; font-weight: 400; padding: 20px 0; color: #000;">Total</th>
        </tr>
      </thead>
      <tbody>
      ${
        data?.menu_items.length > 0 &&
        data?.menu_items.map(
          (item: any) =>
            `
      <tr >
          <td style="font-size: 28px; padding: 20px 0; color: #000;">${item?.menu_item_name}</td>
          <td style="font-size: 28px; padding: 20px 0; color: #000;">${item?.quantity} X Rs.${item?.unit_price?.amount}</td>
          <td style="font-size: 28px; padding: 20px 0; text-align: right; color: #000;">Rs. ${item?.total?.amount}</td>
        </tr>
      
      `,
        )
      }
     
      <tr style="border-top: 2px solid #ddd; padding-top: 30px; ">
      <td style="font-size: 52px; padding: 20px 0; font-weight: 400; color: #000; letter-spacing: -1px;">Total</td>
          <td style="font-size: 28px; padding: 20px 0; color: #000;"></td>
                    <td style="font-size: 52px; font-weight: 400; padding: 20px 0; text-align: right; color: #000;">Rs. ${
                      data?.summary?.total_revenue?.amount
                    }</td>
      </tr>
      </tbody>
    </table>
  </div>
    
</div>
`;

  const options = {
    html: htmlContent,
    fileName: 'OrderChit',
    directory: 'cache',
  };

  const file = await generatePDF(options);

  const pdfUri = `file://${file.filePath}`;

  try {
    await Share.open({
      title: 'Share PDF',
      url: pdfUri,
    });
  } catch (err) {
    console.log('Error =>', err);
  }
};

export default pdfInvoice;
