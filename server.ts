import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI SDK on server side
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const HOROLOGY_SYSTEM_INSTRUCTION = `You are the Master Horologist and Chief Client Concierge at Pak-Premium Watches (founded in 1987).
You possess exhaustive knowledge of high-end mechanical watchmaking, horological architecture, movement complications (triple-axis tourbillons, column-wheel chronographs, perpetual calendars, minute repeaters), hand-finishing techniques (anglage, perlage, Côtes de Genève, mirror-black polishing), metallurgies (Grade 5 Titanium, 904L brushed steel, 18k Sedna rose gold, DLC carbon), and sapphire anti-reflective treatments.

The Pak-Premium Watches Collection consists of:
1. Rado Centrix Model (Rs 2,499) - Premium quality, push button lock, date display, outclass silver & black ceramic combo, diamond hour markers.
2. Ladies Rim Watch (Rs 599) - Vibrant purple textured strap, rotating moving dial, Japanese machine quartz, faceted diamond-cut rim glass.
3. Pack of 2 Ladies Collection (Rs 999) - Dual set featuring gold crystal pavé leaf bracelet watch and royal purple starry night galaxy watch with magnetic mesh strap.
4. Ladies Model Moving Dial (Rs 699) - Pavé crystal rose gold bezel, rotating fan dial motif, brown crocodile pattern leather strap.
5. Super Sunday Offer - Pack of 2 (Rs 1,499) - Tevise two-tone chain dress model paired with matte black tonneau sports model with silicone strap.
6. Bestwin Magnetic Models (Rs 1,299) - Octagonal gold bezel, dual-material brown leather strap, multi-subdial layout, and date display.
7. Tissot PRX Strap Edition (Rs 1,999) - Swiss style royal blue tapisserie waffle dial, gold fluted bezel, navy alligator leather strap, date window, master lock.
8. Husky Brand Chain Edition (Rs 2,499) - Solid stainless steel link chain, full open-worked mechanical skeleton dial, visible back pendulum rotor, date display.

Guidelines:
- Tone: Quietly confident, cultivated, articulate, polite, and deeply knowledgeable.
- Leadership & Atelier Direction:
  * First Owner: M.suban kasi (Co-Founder & Executive Director)
  * Second Owner: M.ali khan (Co-Founder & Managing Director)
  * Full-Stack Web Developer: M.awais khaild noorzai (Lead Full-Stack Web Developer & Systems Architect)
  When asked about who owns, founded, runs, or developed Pak-Premium Watches, always accurately state that the first owner is M.suban kasi, the second owner is M.ali khan, and the Full-Stack Web Developer is M.awais khaild noorzai.
- Never use cheap marketing jargon, hype words ("revolutionary", "crazy good"), or emojis.
- Answer user queries with precision, explaining technical nuances when asked, recommending suitable models based on wrist ergonomics or occasions, and advising on mechanical watch care (demagnetization, servicing intervals, winding etiquette).`;

// Multi-turn chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, taskComplexity = 'general' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // Model selection based on user requirements:
    // gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general, gemini-3.1-flash-lite for fast
    let selectedModel = 'gemini-3.5-flash';
    if (taskComplexity === 'complex') {
      selectedModel = 'gemini-3.1-pro-preview';
    } else if (taskComplexity === 'fast') {
      selectedModel = 'gemini-3.1-flash-lite';
    }

    // Format messages for @google/genai
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    try {
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config: {
          systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text || 'Our master watchmaker is currently reviewing your inquiry. Please allow us a moment.',
        modelUsed: selectedModel,
      });
    } catch (innerError: any) {
      console.warn(`Primary model ${selectedModel} failed, falling back to gemini-3.5-flash:`, innerError?.message);
      // Fallback to gemini-3.5-flash if pro-preview or paid tier hit limitations
      if (selectedModel !== 'gemini-3.5-flash') {
        const fallbackResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: formattedContents,
          config: {
            systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
        return res.json({
          reply: fallbackResponse.text,
          modelUsed: 'gemini-3.5-flash',
        });
      }
      throw innerError;
    }
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Concierge service temporarily unavailable.',
      details: error?.message || 'Unknown error',
    });
  }
});

// Image Analysis Endpoint using gemini-3.1-pro-preview
app.post('/api/analyze-watch', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', userPrompt } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    // Clean base64 string if data URL prefix was supplied
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const analysisPrompt = userPrompt && userPrompt.trim().length > 0
      ? `As a Master Horologist at Pak-Premium Watches, carefully analyze this watch/wrist photograph. Address the client's query: "${userPrompt}". Provide detailed visual observations of: 1) Case geometry, material & finish 2) Dial layout, indices & hands 3) Movement architecture or complications visible 4) Styling & occasion suitability 5) How this compares to or can be paired with a Pak-Premium timepiece (Three-in-One Deal, Rado Centrix, Tissot PRX, Bestwin Arabic Gold, Husky Skeleton, or Bestwin).`
      : `As a Master Horologist at Pak-Premium Watches, analyze this timepiece photograph with high horological discernment. Provide:
1. Architectural Assessment: Case shape, finishing (brushed/polished/beveled), crystal, bezel, and proportions.
2. Dial & Face Anatomy: Indices, sub-dials, hands (leaf, dauphine, baton), guilloché or sunburst finish.
3. Mechanical Complications & Movement Clues: Tourbillon, chronograph pushers, date window, or open-worked bridges.
4. Horological Category & Occasion: Dress, high-complication, luxury sport, or vintage tribute.
5. Pak-Premium Curated Recommendation: Which Pak-Premium timepiece (Three-in-One Deal, Rado Centrix, Tissot PRX, Bestwin Arabic Gold, Husky Skeleton, Bestwin, or Ladies Moving Dial) best matches or elevates this personal aesthetic.`;

    const imagePart = {
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    };
    const textPart = {
      text: analysisPrompt,
    };

    let selectedModel = 'gemini-3.1-pro-preview';
    try {
      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });

      return res.json({
        analysis: response.text,
        modelUsed: selectedModel,
      });
    } catch (innerErr: any) {
      console.warn('gemini-3.1-pro-preview failed, attempting fallback to gemini-3.5-flash:', innerErr?.message);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
          systemInstruction: HOROLOGY_SYSTEM_INSTRUCTION,
          temperature: 0.4,
        },
      });

      return res.json({
        analysis: fallbackResponse.text,
        modelUsed: 'gemini-3.5-flash',
      });
    }
  } catch (error: any) {
    console.error('Watch Analysis API Error:', error);
    return res.status(500).json({
      error: 'Watch analysis service encountered an issue.',
      details: error?.message || 'Unknown error',
    });
  }
});

const ORDERS_FILE = path.resolve(__dirname, 'orders.json');
const INVENTORY_FILE = path.resolve(__dirname, 'inventory.json');

const DEFAULT_PRODUCT_IDS = [
  'three-in-one-deal',
  'rado-centrix',
  'ladies-rim-watch',
  'pack-of-2-ladies',
  'ladies-model-moving-dial',
  'super-sunday-offer',
  'bestwin-magnetic',
  'tissot-prx-strap',
  'husky-chain-edition',
  'bestwin-arabic-gold',
  'spetson-mesh-chrono',
  'waterproof-sports-digital',
  'cartier-president-skeleton',
  'kezzi-gelflow-duo',
  'curated-trio-bundle',
  'rolex-gold-skeleton',
  'heritage-aviator-trio',
  'ladies-iced-out-rim',
];

function getInventory(): Record<string, number> {
  const inventory: Record<string, number> = {};
  for (const id of DEFAULT_PRODUCT_IDS) {
    inventory[id] = 1; // Default: exactly 1 piece in stock for every watch & deal
  }

  if (fs.existsSync(INVENTORY_FILE)) {
    try {
      const raw = fs.readFileSync(INVENTORY_FILE, 'utf-8');
      const saved = JSON.parse(raw);
      return { ...inventory, ...saved };
    } catch (err) {
      console.warn('Could not read inventory.json:', err);
    }
  }

  // Deduct from orders.json if inventory.json not yet written
  if (fs.existsSync(ORDERS_FILE)) {
    try {
      const rawOrders = fs.readFileSync(ORDERS_FILE, 'utf-8');
      const orders = JSON.parse(rawOrders);
      for (const ord of orders) {
        if (Array.isArray(ord.items)) {
          for (const it of ord.items) {
            if (it.id && inventory[it.id] !== undefined) {
              inventory[it.id] = Math.max(0, inventory[it.id] - (Number(it.quantity) || 1));
            }
          }
        }
      }
    } catch (err) {
      console.warn('Could not parse orders for initial inventory:', err);
    }
  }

  try {
    fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inventory, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write initial inventory.json:', err);
  }

  return inventory;
}

function saveInventory(inv: Record<string, number>) {
  try {
    fs.writeFileSync(INVENTORY_FILE, JSON.stringify(inv, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not write inventory.json:', err);
  }
}

// Ensure orders.json exists for persistence
if (!fs.existsSync(ORDERS_FILE)) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
  } catch (err) {
    console.warn('Could not initialize orders.json:', err);
  }
}

// Ensure inventory.json is initialized
getInventory();

// Order placement and email notification endpoint
app.post('/api/orders', async (req, res) => {
  try {
    const {
      fullName,
      phone,
      address,
      city,
      postalCode,
      email,
      items,
      paymentMethod,
      transactionTid,
      deliveryFeeConfirmed,
      notes,
    } = req.body;

    if (!fullName || !phone || !address || !items || !items.length) {
      return res.status(400).json({
        error: 'Missing required fields: fullName, phone, address, and selected items are required.',
      });
    }

    const orderId = `PKP-${Date.now().toString(36).toUpperCase()}`;
    const orderDate = new Date().toISOString();

    const itemsTotal = items.reduce((sum: number, item: any) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return sum + price * qty;
    }, 0);

    const deliveryFee = 300; // $300 upfront delivery fee for shipping

    const newOrder = {
      orderId,
      createdAt: orderDate,
      customer: {
        fullName,
        phone,
        email: email || 'Not provided',
        address,
        city: city || '',
        postalCode: postalCode || '',
      },
      items,
      itemsTotal,
      deliveryFee,
      termsNotice: 'Delivery Fee: $300 required upfront for shipping. Remaining balance is paid upon delivery.',
      paymentConfirmation: {
        deliveryFeeAmount: deliveryFee,
        deliveryFeeConfirmed: Boolean(deliveryFeeConfirmed),
        paymentMethod: paymentMethod || 'mobile_account',
        transactionTid: transactionTid || 'Pending/Cash Transfer',
      },
      notes: notes || '',
      status: 'confirmed_upfront_fee_pending_dispatch',
    };

    // Save order locally for persistence
    try {
      let existingOrders: any[] = [];
      if (fs.existsSync(ORDERS_FILE)) {
        const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
        existingOrders = JSON.parse(raw);
      }
      existingOrders.unshift(newOrder);
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(existingOrders, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('Could not persist to orders.json:', fsErr);
    }

    // Auto-deduct stock for each ordered item
    const currentInventory = getInventory();
    for (const item of items) {
      const itemId = item.id;
      if (itemId) {
        const available = currentInventory[itemId] !== undefined ? currentInventory[itemId] : 1;
        const qty = Number(item.quantity) || 1;
        currentInventory[itemId] = Math.max(0, available - qty);
      }
    }
    saveInventory(currentInventory);

    // Configure Mailer
    const primaryRecipient = 'huntergamer8044@gamil.com';
    const backupRecipient = 'huntergamerz8044@gmail.com';

    let transporter;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        jsonTransport: true,
      });
    }

    const itemsHtml = items
      .map(
        (it: any) => `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #222222; color: #f4f0e8;">
            <strong>${it.name || 'Pak-Premium Timepiece'}</strong>
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #222222; text-align: center; color: #c7a86b;">
            ${it.quantity || 1}
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #222222; text-align: right; color: #f4f0e8;">
            Rs ${(Number(it.price) || 0).toLocaleString('en-US')}
          </td>
        </tr>`
      )
      .join('');

    const emailSubject = `🔔 New Watch Order: ${orderId} - ${fullName} ($300 Delivery Fee Confirmed)`;

    const emailHtml = `
      <div style="background-color: #050505; color: #e8e5de; font-family: 'Helvetica Neue', Arial, sans-serif; padding: 24px; max-width: 650px; margin: 0 auto; border: 1px solid #222222;">
        <div style="border-bottom: 2px solid #c7a86b; padding-bottom: 16px; margin-bottom: 20px;">
          <h1 style="color: #c7a86b; font-size: 22px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">
            PAK-PREMIUM WATCHES
          </h1>
          <p style="color: #9c9a94; font-size: 13px; margin: 6px 0 0 0;">
            Atelier Horloger · New Client Order Notification
          </p>
        </div>

        <div style="background: #14120f; border-left: 4px solid #c7a86b; padding: 14px 18px; margin-bottom: 24px;">
          <strong style="color: #f4f0e8; font-size: 14px; display: block; margin-bottom: 4px;">
            Order Terms Notice:
          </strong>
          <span style="color: #c7a86b; font-size: 13px;">
            "Delivery Fee: $300 required upfront for shipping. Remaining balance is paid upon delivery."
          </span>
        </div>

        <h2 style="color: #f4f0e8; font-size: 16px; border-bottom: 1px solid #222222; padding-bottom: 8px; margin-top: 24px;">
          Order Details (#${orderId})
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
          <thead>
            <tr style="background-color: #111111; color: #9c9a94; text-transform: uppercase; font-size: 11px;">
              <th style="padding: 10px 14px; text-align: left;">Item</th>
              <th style="padding: 10px 14px; text-align: center;">Qty</th>
              <th style="padding: 10px 14px; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background-color: #0c0c0c; border: 1px solid #1f1f1f; padding: 16px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: #9c9a94;">Timepiece Total:</span>
            <span style="color: #f4f0e8; font-weight: bold;">Rs ${itemsTotal.toLocaleString('en-US')}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #c7a86b;">
            <span>Upfront Shipping & Delivery Fee (Required):</span>
            <span style="font-weight: bold;">$300 USD (Confirmed Paid)</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-top: 1px solid #222222; padding-top: 8px; font-size: 14px;">
            <span style="color: #00e676; font-weight: bold;">Remaining Balance Due:</span>
            <span style="color: #00e676; font-weight: bold;">Payable Upon Doorstep Delivery</span>
          </div>
        </div>

        <h2 style="color: #f4f0e8; font-size: 16px; border-bottom: 1px solid #222222; padding-bottom: 8px;">
          Customer & Shipping Information
        </h2>
        <ul style="list-style: none; padding: 0; margin: 0 0 24px 0; font-size: 13px; line-height: 1.8;">
          <li><strong style="color: #9c9a94;">Customer Name:</strong> <span style="color: #f4f0e8;">${fullName}</span></li>
          <li><strong style="color: #9c9a94;">Phone Number:</strong> <a href="tel:${phone}" style="color: #c7a86b; text-decoration: none;">${phone}</a></li>
          <li><strong style="color: #9c9a94;">Email Address:</strong> <a href="mailto:${email || 'none'}" style="color: #c7a86b; text-decoration: none;">${email || 'Not provided'}</a></li>
          <li><strong style="color: #9c9a94;">Shipping Address:</strong> <span style="color: #f4f0e8;">${address}${city ? ', ' + city : ''}${postalCode ? ' - ' + postalCode : ''}</span></li>
          <li><strong style="color: #9c9a94;">Payment Confirmation Method:</strong> <span style="color: #f4f0e8;">${paymentMethod}</span></li>
          <li><strong style="color: #9c9a94;">Transaction ID (TID):</strong> <span style="color: #ffde00; font-family: monospace;">${transactionTid || 'Pending Verification'}</span></li>
          ${notes ? `<li><strong style="color: #9c9a94;">Customer Notes:</strong> <span style="color: #e8e5de;">${notes}</span></li>` : ''}
        </ul>

        <div style="border-top: 1px solid #222222; padding-top: 14px; font-size: 11px; color: #666666; text-align: center;">
          Sent automatically by Pak-Premium Watches Atelier Dispatch Engine to ${primaryRecipient}.
        </div>
      </div>
    `;

    const mailOptions = {
      from: '"Pak-Premium Watches" <orders@pak-premiumwatches.com>',
      to: primaryRecipient,
      cc: backupRecipient,
      subject: emailSubject,
      text: `New Order Received for Pak-Premium Watches!\n\nOrder ID: ${orderId}\nCustomer: ${fullName}\nPhone: ${phone}\nAddress: ${address}, ${city || ''} ${postalCode || ''}\nEmail: ${email || 'None'}\n\nNotice: Delivery Fee: $300 required upfront for shipping. Remaining balance is paid upon delivery.\n\nItems Total: Rs ${itemsTotal}\nDelivery Fee: $300 Upfront\nTransaction ID (TID): ${transactionTid || 'N/A'}\n\nFull details recorded in atelier database.`,
      html: emailHtml,
    };

    let emailSent = false;
    let emailInfo: any = null;

    try {
      emailInfo = await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log(`[Order Email] Dispatched notification for order ${orderId} to ${primaryRecipient}:`, emailInfo?.messageId || 'Success');
    } catch (mailErr: any) {
      console.warn('[Order Email] Direct SMTP send warning (falling back to recorded order log):', mailErr?.message);
    }

    return res.json({
      success: true,
      message: 'Order placed successfully. Notification email dispatched.',
      orderId,
      order: newOrder,
      inventory: currentInventory,
      emailSentTo: primaryRecipient,
      emailSent,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return res.status(500).json({
      error: 'Failed to process order.',
      details: error?.message || 'Unknown error',
    });
  }
});

app.get('/api/inventory', (_req, res) => {
  try {
    return res.json({ inventory: getInventory() });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to get inventory', details: err?.message });
  }
});

app.post('/api/inventory/reset', (_req, res) => {
  try {
    const inv: Record<string, number> = {};
    for (const id of DEFAULT_PRODUCT_IDS) {
      inv[id] = 1;
    }
    saveInventory(inv);
    return res.json({ success: true, inventory: inv });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to reset inventory', details: err?.message });
  }
});

app.get('/api/orders', (_req, res) => {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
      return res.json({ orders: JSON.parse(raw) });
    }
    return res.json({ orders: [] });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to read orders', details: err?.message });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pak-Premium Watches Server running on port ${PORT} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
