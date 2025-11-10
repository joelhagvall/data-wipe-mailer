# Data Wipe Mailer

**Your digital privacy is valuable** - exercise your right to delete personal data before it falls into the wrong hands.

A simple, privacy-focused web app to help you exercise your GDPR Article 17 right to erasure by sending deletion requests to Swedish data brokers and search services.

## Why This Exists

Swedish data brokers like MrKoll, Ratsit, and others collect and publish personal information about individuals. While legal, this data can be misused if it falls into the wrong hands. This tool makes it easy to request deletion of your personal data from multiple services at once.

## Features

- ✅ **8 Swedish data brokers** - Send deletion requests to MrKoll, Ratsit, Birthday.se, Hitta, Eniro, Biluppgifter, Merinfo, and Upplysning
- ✅ **100% client-side** - No data is sent to any server, everything happens locally in your browser
- ✅ **Bilingual** - Full support for Swedish and English
- ✅ **mailto: links** - Opens pre-filled emails in your default mail app
 
- ✅ **Mobile-friendly** - Fully responsive design
- ✅ **GDPR-compliant templates** - Pre-written deletion request templates based on GDPR Article 17

## Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - UI components
- **[Lucide Icons](https://lucide.dev/)** - Icons
- **[Google Favicon API](https://www.google.com/s2/favicons)** - Company logos

## Usage

1. **Select recipients** - Choose which data brokers you want to send deletion requests to
2. **Click "Open in mail app"** - Pre-filled emails will open in your default mail application
3. **Fill in your details** - Add your personal identification number and name
4. **Send** - Review and send the emails directly from your mail app

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Privacy

This application:
- ✅ Runs entirely in your browser
- ✅ Does not collect or store any personal data
- ✅ Does not send any data to external servers (except company logos via Google Favicon API)
- ✅ Uses only `mailto:` links to compose emails in your local mail application
- ✅ Puts recipients in BCC by default to protect their email addresses
- ✅ Lägger mottagare i BCC som standard för att skydda deras e‑postadresser

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with privacy in mind by [Joel Hägvall](https://github.com/joelhagvall)
