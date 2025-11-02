# NFC Splash Screen Solutions

## The Problem
When you tap an NFC card that links directly to a VCF file (like `vcards/kraig-murray.vcf`), the phone downloads it immediately and never shows your splash screen.

## Two Solutions

### ✅ Option 1: Reprogram NFC Cards (Best)
Change the URL on your NFC cards to point to the main team page instead of directly to the VCF file.

**Change from:**
```
https://yourdomain.com/vcards/kraig-murray.vcf
```

**Change to:**
```
https://yourdomain.com/vcards.html?nfc=true
```

**What happens:**
1. User taps NFC card
2. Sees splash screen (3 seconds)
3. Sees team page with all contacts
4. Clicks the button to download the VCF

**Pros:**
- ✅ Simple - just one page to maintain
- ✅ User can see all team members
- ✅ Splash screen shows every time
- ✅ Professional experience

**Cons:**
- ❌ Need to reprogram NFC cards
- ❌ User has to click to download (one extra step)

---

### ✅ Option 2: Individual Redirect Pages (More Complex)
Create a separate HTML page for each team member that shows splash, auto-downloads VCF, then redirects.

**Program NFC cards to:**
```
https://yourdomain.com/kraig-murray.html
https://yourdomain.com/david-soto.html
```

**What happens:**
1. User taps NFC card
2. Opens person-specific page
3. Sees splash screen with their photo
4. VCF downloads automatically after 1 second
5. Redirects to full team page after 3 seconds

**Pros:**
- ✅ Splash screen shows
- ✅ VCF downloads automatically
- ✅ Personalized experience with their photo
- ✅ Still get to see team page

**Cons:**
- ❌ Need one HTML file per team member
- ❌ More files to maintain

---

## Option 2 Setup Instructions

I've created two example files:
- `kraig-murray.html`
- `david-soto.html`

### For Each Team Member:

**1. Copy the template and edit:**
```html
<!-- Change these 3 things -->
<title>John Smith - High Point</title>
<img src="images/team/John/John.webp" alt="John Smith">
<h2>John Smith</h2>
<p class="title">Project Manager</p>
<a href="vcards/john-smith.vcf" class="btn-download-large" download>

<!-- And in the script at bottom -->
<script>
    const vcfFile = 'vcards/john-smith.vcf';
</script>
```

**2. Save as:**
```
john-smith.html
```

**3. Upload to your website root**

**4. Program NFC card with URL:**
```
https://yourdomain.com/john-smith.html
```

---

## Customizing Option 2

### Change Download Timing:
```javascript
// Auto-download VCF after 1 second
setTimeout(function() {
    // download code
}, 1000);  // ← Change this number (milliseconds)
```

### Change Redirect Timing:
```javascript
const redirectDelay = 3000; // ← Change this (3000 = 3 seconds)
```

### Remove Auto-redirect:
If you want splash screen but NO redirect to team page, just remove this:
```javascript
// Delete or comment out these lines:
setTimeout(function() {
    window.location.href = redirectUrl;
}, redirectDelay);
```

### Skip Auto-download:
If you want them to click the button manually, remove:
```javascript
// Delete or comment out these lines:
setTimeout(function() {
    const link = document.createElement('a');
    link.href = vcfFile;
    link.download = vcfFile.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}, 1000);
```

---

## My Recommendation

### For Most Businesses: **Option 1**
- Simpler to maintain
- One page for all team members
- Easy to update
- Professional experience

### For Premium/Executive Cards: **Option 2**
- More personalized
- Smoother experience
- Auto-downloads VCF
- Worth the extra work for key people

### Hybrid Approach:
Use Option 2 for your top executives (Owner, Sales Director, etc.) and Option 1 for everyone else.

---

## Testing Your NFC Cards

### iPhone Testing:
1. Tap NFC card to back of phone (near camera)
2. Notification appears at top
3. Tap notification to open Safari
4. Should see splash screen
5. VCF should download (check Files app)
6. Can import to Contacts from Files

### Android Testing:
1. Tap NFC card to back of phone
2. Browser opens automatically
3. Should see splash screen
4. VCF downloads automatically
5. Notification to add to Contacts

---

## Troubleshooting

### "VCF not downloading automatically"
- Check the file path in the script
- Make sure VCF file exists on server
- Try clicking the button manually
- Check browser console for errors (F12)

### "Splash screen not showing"
- Verify you're using the right URL (not the .vcf file)
- Check that images are loading (logo, photo)
- Test in browser first before NFC

### "Redirect not working"
- Check the `redirectUrl` in the script
- Make sure `vcards.html` exists
- Check for JavaScript errors in console

### "Photo not showing"
- Verify photo path matches folder structure
- Check that image file exists
- Try opening image URL directly

---

## File Structure

```
your-website/
├── index.html
├── vcards.html                    # Main team page
├── kraig-murray.html              # Redirect page for Kraig
├── david-soto.html                # Redirect page for David
├── vcards/
│   ├── kraig-murray.vcf
│   └── david-soto.vcf
└── images/
    └── team/
        ├── Kraig/
        │   └── Kraig.webp
        └── David/
            └── David.webp
```

---

## Quick Comparison

| Feature | Option 1 (Main Page) | Option 2 (Redirect Pages) |
|---------|---------------------|---------------------------|
| Splash Screen | ✅ Yes | ✅ Yes |
| Auto-download | ❌ No (manual click) | ✅ Yes |
| Personalized | ❌ Generic | ✅ Shows their info |
| Files to maintain | 1 page | 1 page per person |
| NFC programming | One URL | Different URL each |
| Best for | Most users | VIP/Executives |

---

## Summary

**Problem:** NFC going directly to VCF = no splash screen

**Solution 1:** Reprogram NFC to go to `vcards.html?nfc=true`
- Simple, one page, user clicks to download

**Solution 2:** Create person-specific redirect pages
- Complex, many pages, auto-downloads VCF

Choose based on your needs! 🚀
