export type BookmarkLangString = {
	en: string;
	ta: string;
};

export type BookmarkItem = {
	title: BookmarkLangString;
	url: string;
	format: 'article' | 'book' | 'video' | 'podcast' | 'music';
	source: BookmarkLangString;
	status: BookmarkLangString;
	annotation: BookmarkLangString;
	duration?: string;
};

export type BookmarkCategory = {
	id: string;
	title: BookmarkLangString;
	description: BookmarkLangString;
	items: BookmarkItem[];
};

export const formatLabels: Record<BookmarkItem['format'], BookmarkLangString> = {
	article: { en: 'Article', ta: 'கட்டுரை' },
	book: { en: 'Book', ta: 'புத்தகம்' },
	video: { en: 'Video', ta: 'காணொளி' },
	podcast: { en: 'Podcast', ta: 'பாட்காஸ்ட்' },
	music: { en: 'Music', ta: 'இசை' }
};

export const bookmarkCategories: BookmarkCategory[] = [
	{
		id: 'federal-watch',
		title: {
			en: 'Federal Watchlist',
			ta: 'அரசமைப்பு கண்காணிப்பு'
		},
		description: {
			en: 'Articles and briefs I keep revisiting to understand the Centre–State power balance.',
			ta: 'மத்திய–மாநில அதிகார சமநிலையைப் புரிந்து கொள்ள நான் அடிக்கடி திரும்பிப் பார்க்கும் கட்டுரைகள்.'
		},
		items: [
			{
				title: {
					en: 'The 29-Paise Rupee: Anatomy of a Fiscal Heist',
					ta: '29-பைசா ரூபாய்: நிதி கொள்ளையின் உடற்கூறு'
				},
				url: 'https://theindiaforum.in/article/29-paise-rupee',
				format: 'article',
				source: { en: 'The India Forum', ta: 'தி இந்தியா ஃபோரம்' },
				status: { en: 'Reading notes in progress', ta: 'குறிப்புகள் தயாராகிறது' },
				annotation: {
					en: 'Explains how cess-based taxation quietly sidelines states. Essential before any Finance Commission meeting.',
					ta: 'செஸ் வரிகள் மாநிலங்களை எவ்வாறு புறக்கணிக்கிறது என்பதை விளக்கும் கட்டுரை. நிதி ஆணையக் கூட்டங்களுக்கு முன் படிக்க வேண்டியது.'
				}
			},
			{
				title: {
					en: 'Governor’s Silence is a Constitutional Weapon',
					ta: 'ஆளுநரின் மௌனம் அரசியலமைப்பு ஆயுதம்'
				},
				url: 'https://www.scobserver.in/reports/governor-powers-special',
				format: 'article',
				source: { en: 'Supreme Court Observer', ta: 'உச்சநீதிமன்ற ஆய்வாளர்' },
				status: { en: 'Reference', ta: 'குறிப்பேடு' },
				annotation: {
					en: 'Charts every Article 200 delay since 2014; I cite this when demanding accountability mechanisms.',
					ta: '2014 முதல் Article 200 தாமதங்களின் பட்டியல்; பொறுப்புணர்வு முறைகளை வலியுறுத்தும்போது பயன்படுத்துகிறேன்.'
				}
			},
			{
				title: {
					en: 'NITI Aayog’s Cooperative Federalism Promise vs Reality',
					ta: 'நீதி ஆயோக்: ஒத்துழைத்த அரசமைப்பு – வாக்குறுதி & நடைமுறை'
				},
				url: 'https://prsindia.org/policy/research/niti-aayog-evaluation',
				format: 'article',
				source: { en: 'PRS Legislative Research', ta: 'பிஆர்எஸ் சட்ட ஆய்வு' },
				status: { en: 'Filed under “Watch Closely”', ta: '“கவனிக்க” பட்டியலில்' },
				annotation: {
					en: 'Good primer for teams tracking centrally sponsored schemes and their fiscal strings.',
					ta: 'மத்திய ஆதரவு திட்டங்களின் நிதி நிபந்தனைகளைக் கண்காணிக்க உதவும் அடிப்படை குறிப்பு.'
				}
			}
		]
	},
	{
		id: 'books-shelf',
		title: {
			en: 'On the Desk',
			ta: 'மேசையில் இருக்கும் புத்தகங்கள்'
		},
		description: {
			en: 'Books and long-form research shaping my “Federalism Under Siege” manuscript.',
			ta: '“Federalism Under Siege” நூலை வடிவமைக்கும் நீளமான ஆய்வுகள்.'
		},
		items: [
			{
				title: {
					en: 'The Indian Constitution: Cornerstone of a Nation',
					ta: 'இந்திய அரசியலமைப்பு: ஒரு தேசத்தின் மூலக்கல்'
				},
				url: 'https://archive.org/details/granville-austin-cornerstone',
				format: 'book',
				source: { en: 'Granville Austin', ta: 'கிரான்வில் அஸ்டின்' },
				status: { en: 'Re-reading Chapter 10', ta: 'அத்தியாயம் 10 மீண்டும் படிக்கிறது' },
				annotation: {
					en: 'Austin’s framing of “cooperative federalism” still holds mirrors to today’s debates.',
					ta: '“ஒத்துழைத்த அரசமைப்பு” பற்றிய அஸ்டினின் விளக்கம் இன்றும் பொருந்துகிறது.'
				}
			},
			{
				title: {
					en: 'Remapping India: New States and Their Political Origins',
					ta: 'இந்தியா மறுவமைப்பு: புதிய மாநிலங்களின் அரசியல்'
				},
				url: 'https://press.uchicago.edu/ucp/books/book/chicago/R/bo15664607.html',
				format: 'book',
				source: { en: 'Louise Tillin', ta: 'லூயிஸ் டில்லின்' },
				status: { en: 'Notebook filled with quotes', ta: 'குறிப்பேடு மேற்கோள்களால் நிரம்பியது' },
				annotation: {
					en: 'Useful when we talk Telangana, Gorkhaland, or any decentralisation demand based on identity.',
					ta: 'தெலுங்கானா, குர்கா அல்லது அடையாளத்தை அடிப்படையாகக் கொண்ட சுயாட்சி கோரிக்கைகள் குறித்து பேசும்போது பயன்படும்.'
				}
			},
			{
				title: {
					en: 'State of India’s Governors',
					ta: 'இந்திய ஆளுநர்களின் நிலை'
				},
				url: 'https://pudr.org/state-of-governors-report',
				format: 'book',
				source: { en: 'People’s Union for Democratic Rights', ta: 'ஜனநாயக உரிமைகள் மக்கள் ஒன்றியம்' },
				status: { en: 'Marking data for speeches', ta: 'பேச்சுகளுக்கான தரவை குறிக்கிறது' },
				annotation: {
					en: 'A concise dossier with facts and timelines whenever Raj Bhavan oversteps.',
					ta: 'ராஜ் பவனின் தலையீடுகளை விவரிக்கும் சான்றுகளுடன் கூடிய குறும்படம்.'
				}
			}
		]
	},
	{
		id: 'media-playlist',
		title: {
			en: 'Interviews, Audio & Music',
			ta: 'பேட்டிகள், ஒலி மற்றும் இசை'
		},
		description: {
			en: 'Clips that communicate the federalism message beyond policy circles.',
			ta: 'கொள்கை வட்டங்களைத் தாண்டி அரசமைப்பு சிந்தனையைப் பரப்பும் உள்ளடக்கங்கள்.'
		},
		items: [
			{
				title: {
					en: 'Aram Porul Kalvi – “Why States Matter”',
					ta: 'அறம் பொருள் கல்வி – “மாநிலங்கள் ஏன் முக்கியம்?”'
				},
				url: 'https://www.youtube.com/watch?v=federalism01',
				format: 'video',
				source: { en: 'YouTube Channel: Aram Porul Kalvi', ta: 'யூடியூப்: அறம் பொருள் கல்வி' },
				status: { en: 'Shared with student volunteers', ta: 'மாணவர் தன்னார்வலர்களுடன் பகிரப்பட்டது' },
				annotation: {
					en: 'Use this to introduce the project whenever you meet first-time volunteers.',
					ta: 'முதன்முறையாக சந்திக்கும் தன்னார்வலர்களுக்கு இந்த வீடியோவை பரிந்துரைக்கவும்.'
				},
				duration: '18 min'
			},
			{
				title: {
					en: 'Policy Room Podcast – Episode 41',
					ta: 'பாலிசி ரூம் பாட்காஸ்ட் – பகுதி 41'
				},
				url: 'https://open.spotify.com/show/policy-room',
				format: 'podcast',
				source: { en: 'Policy Room', ta: 'பாலிசி ரூம்' },
				status: { en: 'Recording scheduled', ta: 'பதிவு திட்டமிடப்பட்டது' },
				annotation: {
					en: 'Upcoming episode on GST Compensation dues; keep track of listener questions.',
					ta: 'GST ஈடு நிலுவைகள் குறித்த அடுத்த பகுதி; கேட்பவர்களின் கேள்விகளை பதிவு செய்யவும்.'
				}
			},
			{
				title: {
					en: '“Semmozhiyaana Thamizh Mozhiyaam” – Ilaiyaraaja',
					ta: '“செம்மொழியான தமிழ் மொழியாம்” – இளையராஜா'
				},
				url: 'https://www.youtube.com/watch?v=w3FAb3pHz-0',
				format: 'music',
				source: { en: 'World Classical Tamil Conference Anthem', ta: 'உலகத் தமிழ் மாநாட்டு கீதம்' },
				status: { en: 'Keeps Tamil cadence alive in every rally', ta: 'ஒவ்வொரு பொதுக்கூட்டத்திலும் தமிழ் தாளத்தைக் காப்பது' },
				annotation: {
					en: 'My go-to track before drafting speeches in Tamil.',
					ta: 'தமிழில் உரை எழுதுவதற்கு முன் நான் கேட்கும் பாடல்.'
				},
				duration: '6 min'
			}
		]
	}
];
