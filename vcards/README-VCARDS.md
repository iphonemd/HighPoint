# NFC Business Card VCard System
## Setup Guide for High Point Roofing & Waterproofing

## 📋 Overview
This system allows team members to share their contact information via NFC-enabled business cards. When someone taps an NFC card with their phone, they'll be directed to a webpage where they can easily download the contact information.

## 🗂️ File Structure
```
your-website/
├── vcards.html                 # Main team directory page
├── vcards/                     # Folder for VCard files
│   ├── kraig-murray.vcf       # Example VCard
│   ├── team-member-2.vcf      # Add more members here
│   └── ...
├── images/
│   └── team/                   # Optional: team member photos
│       ├── kraig.jpg
│       └── ...
```

## 🚀 Setup Instructions

### Step 1: Upload Files to Your Website
1. Upload the `.vcf` files to the `vcards` folder

### Step 2: Create VCard Files for Each Team Member
1. Use the `vcard-template.vcf` as a starting point
2. Edit the following fields:
   ```
   FN:Full Name Here
   N:LastName;FirstName;;;
   TITLE:Job Title
   TEL;TYPE=WORK,VOICE:(Phone Number)
   EMAIL;TYPE=INTERNET,WORK:email@highpointrwp.com
   ```
3. Save each file as `firstname-lastname.vcf`
4. Upload to the `vcards` folder

### Step 3: Update the vcards.html Page
1. Open `vcards.html`
2. Find the team member card section
3. Duplicate the card HTML for each team member:
   ```html
   <div class="vcard-item">
       <div class="vcard-photo">
           <i class="fas fa-user"></i>
       </div>
       <h3 class="vcard-name">Team Member Name</h3>
       <p class="vcard-title">Job Title</p>
       <div class="vcard-details">
           <div class="vcard-detail">
               <i class="fas fa-phone"></i>
               <a href="tel:PHONENUMBER">Phone Number</a>
           </div>
           <div class="vcard-detail">
               <i class="fas fa-envelope"></i>
               <a href="mailto:EMAIL">Email</a>
           </div>
       </div>
       <div class="vcard-actions">
           <a href="vcards/filename.vcf" class="btn-download" download>
               <i class="fas fa-download"></i> Add Contact
           </a>
       </div>
   </div>
   ```

### Step 4: Add Team Photos (Optional)
1. Create a folder: `images/team/`
2. Add photos for each team member (recommended: 400x400px, square)
3. Update the HTML from:
   ```html
   <div class="vcard-photo">
       <i class="fas fa-user"></i>
   </div>
   ```
   To:
   ```html
   <div class="vcard-photo">
       <img src="images/team/member-name.jpg" alt="Member Name">
   </div>
   ```

## 📱 Programming NFC Cards

### For iPhone Compatibility:
iPhones require a URL to download VCards. Program your NFC cards with one of these options:

**Option 1: Direct to VCard File (Recommended)**
```
https://yourdomain.com/vcards/kraig-murray.vcf
```

**Option 2: To Team Page**
```
https://yourdomain.com/vcards.html
```

### NFC Programming Steps:
1. **Get an NFC Writer App:**
   - iOS: NFC Tools, NFC TagWriter
   - Android: NFC Tools, TagWriter by NXP

2. **Write the URL:**
   - Open your NFC app
   - Select "Write"
   - Choose "URL/URI" record type
   - Enter the full URL to the VCard file
   - Tap your blank NFC card to write

3. **Test:**
   - Tap the programmed card with your phone
   - iPhone: Should open Safari and download the VCard
   - Android: Should prompt to add contact or download

### Recommended NFC Cards:
- **NTAG215** - Works with all devices, good storage (504 bytes)
- **NTAG216** - More storage (888 bytes) if needed
- Make sure cards are NFC Forum Type 2 compatible

## 🔧 Troubleshooting

### iPhone Not Downloading VCard:
- Ensure the URL is exactly correct (case-sensitive)
- Make sure the .vcf file is on your server
- Check that NFC is enabled (Settings > General > NFC)
- The VCard should download to Files app, then import to Contacts

### Android Issues:
- Some Android phones need NFC enabled in settings
- Try different NFC reader apps if default doesn't work
- Ensure phone supports NFC (most modern phones do)

### File Not Found (404 Error):
- Verify the file path is correct
- Check that file uploaded successfully
- Ensure filename matches exactly (case-sensitive)

## 📝 VCard Format Reference

### Required Fields:
```
BEGIN:VCARD
VERSION:3.0
FN:Display Name
N:LastName;FirstName;;;
END:VCARD
```

### Common Optional Fields:
```
ORG:Company Name
TITLE:Job Title
TEL;TYPE=WORK,VOICE:(555) 123-4567
TEL;TYPE=CELL:(555) 987-6543
EMAIL;TYPE=INTERNET,WORK:email@company.com
URL:https://website.com
ADR;TYPE=WORK:;;Street;City;State;ZIP;Country
NOTE:Additional information
PHOTO;ENCODING=b;TYPE=JPEG:[base64 encoded image]
```

## 🎨 Customization

### Changing Colors:
The page uses your existing CSS variables from `index.css`:
- `--primary`: Main brand color
- `--primary-dark`: Darker shade for hovers
- `--dark`: Text color
- `--gray`: Secondary text color
- `--light`: Background color

### Adding More Information:
You can add additional fields to each team member card:
```html
<div class="vcard-detail">
    <i class="fas fa-linkedin"></i>
    <a href="https://linkedin.com/in/username">LinkedIn</a>
</div>
```

## 📊 Analytics (Optional)
To track NFC card taps:
1. Add Google Analytics to vcards.html
2. Create events for VCard downloads
3. Monitor which team members' cards are most used

## 🔐 Security Notes
- VCard files are plain text and publicly accessible
- Only include information you're comfortable sharing publicly
- Don't include sensitive personal information
- Consider using work phone numbers only

## 📞 Support
If you need help setting this up, contact your web developer or:
- Email: kmurray@highpointrwp.com
- Phone: (405) 615-9838

## ✅ Checklist
- [ ] Upload vcards.html to website
- [ ] Create vcards folder
- [ ] Create .vcf file for each team member
- [ ] Upload .vcf files to vcards folder
- [ ] Update vcards.html with team information
- [ ] (Optional) Add team photos
- [ ] Test VCard downloads on iPhone
- [ ] Test VCard downloads on Android
- [ ] Program NFC cards with correct URLs
- [ ] Test NFC cards on multiple devices
- [ ] Add "Team" link to main navigation
