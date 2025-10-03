import Share from 'react-native-share';
import { generatePDF } from 'react-native-html-to-pdf';
import store from '@/feature/store';
import { formatDate, formatTime } from './formatTime';
import { logoImg, footerImg } from './logoImage';

export const pdfOrderChit = async (data: any) => {
  const userData = store.getState().auth;

  const htmlContent = `
<div style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <div style="max-width: 400px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="font-size: 36px; font-weight: bold; margin: 0; color: #333;">${
              userData?.userName || 'Restaurant Name'
            }</h1>
        </div>

        <!-- Restaurant Info -->
        <div style="text-align: center; margin-bottom: 30px; color: #666;">
            <div style="margin-bottom: 10px; font-size: 16px;">
                <svg style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>${userData?.address || 'Address'}</span>
            </div>
            <div style="font-size: 16px;">
                <svg style="width: 18px; height: 18px; display: inline-block; vertical-align: middle; margin-right: 8px;" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>${userData?.contactNo || 'Contact Number'}</span>
            </div>
        </div>

        <!-- Divider -->
        <div style="height: 1px; background-color: #ddd; margin: 30px 0;"></div>

        <!-- Invoice Details -->
        <div style="margin-bottom: 30px; font-size: 16px;">
            <div style="display: inline-block; width: 48%; vertical-align: top;">
                <div>
                    <strong>Order ID :</strong> #${data?.unique_id || 'N/A'}
                </div>
            </div>
            <div style="display: inline-block; width: 48%; text-align: right; vertical-align: top;">
                <div style="margin-bottom: 8px;">
                    <strong>Date :</strong> ${
                      data?.date || formatDate(data?.created_at)
                    }
                </div>
                <div>
                    <strong>Time :</strong> ${
                      data?.time || formatTime(data?.created_at)
                    }
                </div>
            </div>
        </div>

        <!-- Divider -->
        <div style="height: 1px; background-color: #ddd; margin: 30px 0;"></div>

        <!-- Order Items -->
        <div style="margin-bottom: 30px;">
        ${
          data?.items && data?.items.length > 0
            ? data?.items
                .map(
                  (item: any) => `
            <div style="margin-bottom: 20px;">
                <div style="margin-bottom: 5px;">
                    <span style="font-size: 16px; font-weight: bold; display: inline-block; width: 60%; vertical-align: top;">${
                      item?.item_name || ''
                    }</span>
                    <span style="font-size: 16px; font-weight: bold; display: inline-block; width: 38%; text-align: right; vertical-align: top;">Rs. ${
                      item?.total_price?.toLocaleString() || '0'
                    }</span>
                </div>
                ${
                  item?.variants && item?.variants.length > 0
                    ? item?.variants
                        .map(
                          (variant: any) => `
                    <div style="color: #666; font-size: 14px; margin-top: 5px;">
                        <span style="display: inline-block; width: 60%;">${
                          variant?.variant_name || ''
                        }</span>
                        <span style="display: inline-block; width: 38%; text-align: right;">Qty : ${
                          variant?.quantity || 0
                        }</span>
                    </div>
                `,
                        )
                        .join('')
                    : `
                    <div style="color: #666; font-size: 14px; margin-top: 5px;">
                        <span style="display: inline-block; width: 60%;"></span>
                        <span style="display: inline-block; width: 38%; text-align: right;">Qty : ${
                          item?.quantity || 0
                        }</span>
                    </div>
                `
                }
            </div>
        `,
                )
                .join('')
            : '<div>No items</div>'
        }
        </div>

        <!-- Divider -->
        <div style="height: 2px; background-color: #333; margin: 30px 0;"></div>

        <!-- Total -->
        <div style="margin-bottom: 40px;">
            <span style="font-size: 24px; font-weight: bold; display: inline-block; width: 48%;">Total</span>
            <span style="font-size: 24px; font-weight: bold; display: inline-block; width: 48%; text-align: right;">Rs. ${
              data?.total
                ? parseFloat(
                    data?.fee_breakdown?.subtotal || data?.total,
                  ).toLocaleString()
                : '0'
            }</span>
        </div>

        <!-- Dotted Divider -->
        <div style="border-bottom: 2px dotted #ccc; margin: 30px 0;"></div>

        <!-- Thank You Message -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="font-size: 24px; font-weight: bold; margin: 0 0 10px 0; letter-spacing: 2px;">THANK YOU!</h2>
            <p style="font-size: 16px; margin: 0; color: #666;">order again with</p>
        </div>

        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 30px;">
            <img src="${logoImg}" alt="Logo" style="width: 100px; height: 100px;">
        </div>
<div style="text-align: center; margin-bottom: 30px;">
            <img src="${footerImg}" alt="Logo" style="width: 260px; height: 100px;">
        </div>

        <!-- Bottom Dotted Divider -->
        <div style="border-bottom: 2px dotted #ccc; margin: 30px 0 0 0;"></div>
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
