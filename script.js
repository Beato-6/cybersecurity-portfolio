/**
 * ============================================================================
 * PORTFOLIO BEHAVIOUR
 * ============================================================================
 * Vanilla JavaScript, no dependencies. Renders the collections defined in
 * content.js and wires the page interactions:
 *
 *   1. Projects, writeups, local lab reports, certificates
 *   2. Contact details, social links, resume availability
 *   3. Mobile navigation, scroll spy, report dialog, copy-to-clipboard
 *
 * All user-facing copy lives in index.html or content.js. This file builds
 * nodes with textContent and never injects unsanitized data.
 * ============================================================================
 */
(function () {
  'use strict';

  var data = window.SITE_CONTENT;

  if (!data) {
    console.warn('[portfolio] content.js did not load; collections were not rendered.');
    return;
  }

  /* ==========================================================================
     ICONS — 20px control glyphs (Lucide, ISC) and brand marks
     ========================================================================== */
  var ICONS = {
    'external-link':
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
    'file-text':
      '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
    github:
      '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    linkedin:
      '<svg class="icon" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>',
    x:
      '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>',
    medium:
      '<svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z"/></svg>',
  };

  var STATUS_LABELS = {
    'in-progress': 'In progress',
    documentation: 'Security documentation',
    lab: 'Lab series',
    complete: 'Case study',
  };

  /* ==========================================================================
     SMALL HELPERS
     ========================================================================== */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function icon(name) {
    var holder = document.createElement('div');
    holder.innerHTML = ICONS[name] || '';
    return holder.firstElementChild;
  }

  function field(labelText, valueText, valueClass) {
    var wrap = el('div', valueClass || null);
    wrap.appendChild(el('span', 'field-label', labelText));
    wrap.appendChild(el('p', 'field-value', valueText));
    return wrap;
  }

  function tagList(values) {
    var row = el('ul', 'tag-row');
    values.forEach(function (value) {
      row.appendChild(el('li', 'tag', value));
    });
    return row;
  }

  function formatMonth(iso) {
    if (!iso) return '';
    var value = /^\d{4}-\d{2}$/.test(iso) ? iso + '-01' : iso;
    var date = new Date(value + 'T00:00:00Z');
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  }

  function externalLink(href, label, className, iconName) {
    var link = el('a', className, label);
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (iconName) link.appendChild(icon(iconName));
    return link;
  }

  /* ==========================================================================
     1. PROJECTS
     ========================================================================== */
  function renderProjects() {
    var grid = document.getElementById('projects-grid');
    if (!grid) return;

    var projects = (data.projects || []).slice().sort(function (a, b) {
      return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    });

    projects.forEach(function (project, index) {
      var isLastOdd = index === projects.length - 1 && projects.length % 2 === 1;
      var card = el('article', 'card project-card' + (isLastOdd ? ' project-card--wide' : ''));

      if (project.image) {
        var media = el('div', 'project-media');
        var image = el('img');
        image.src = project.image;
        image.alt = project.title + ' — project diagram';
        image.decoding = 'async';
        image.width = 800;
        image.height = 450;
        media.appendChild(image);
        card.appendChild(media);
      }

      var body = el('div', 'project-body');

      var head = el('div', 'project-head');
      head.appendChild(el('h3', 'project-title', project.title));
      if (STATUS_LABELS[project.status]) {
        head.appendChild(el('span', 'project-status', STATUS_LABELS[project.status]));
      }
      body.appendChild(head);

      body.appendChild(field('Contribution', project.contribution, 'project-contribution'));

      if (project.description) {
        body.appendChild(el('p', 'project-desc', project.description));
      }

      if (project.technologies && project.technologies.length) {
        var tech = el('div', 'project-tech');
        tech.appendChild(el('span', 'field-label', 'Technologies used'));
        tech.appendChild(tagList(project.technologies));
        body.appendChild(tech);
      }

      var actions = el('div', 'project-actions');

      if (project.repositoryUrl) {
        actions.appendChild(
          externalLink(project.repositoryUrl, 'View Source Code', 'btn btn--secondary btn--sm', 'github')
        );
      }

      if (project.demoUrl) {
        actions.appendChild(externalLink(project.demoUrl, 'Live Demo', 'btn btn--secondary btn--sm', 'external-link'));
      }

      if (project.detailId) {
        var report = lookupReport(project.detailId);
        if (report) {
          var trigger = el(
            'button',
            'btn btn--secondary btn--sm',
            report.area === 'Project Architecture' ? 'Read Project Breakdown' : 'Read Lab Report'
          );
          trigger.type = 'button';
          trigger.setAttribute('data-report-id', report.id);
          trigger.setAttribute('aria-haspopup', 'dialog');
          actions.appendChild(trigger);
        }
      }

      if (actions.childElementCount) {
        body.appendChild(actions);
      } else {
        body.appendChild(el('p', 'project-note', 'Repository not published yet.'));
      }

      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  /* ==========================================================================
     2. WRITEUPS
     ========================================================================== */
  function renderWriteups() {
    var list = document.getElementById('writeups-list');
    if (!list) return;

    var published = (data.writeups || []).filter(function (writeup) {
      return Boolean(writeup.articleUrl);
    });

    if (!published.length) {
      list.appendChild(el('p', 'empty-state', 'No published writeups added yet.'));
      return;
    }

    published.forEach(function (writeup) {
      var card = el('article', 'card writeup-card');

      var meta = el('div', 'writeup-meta');
      meta.appendChild(el('span', 'platform-label', writeup.platform));
      if (writeup.difficulty) {
        meta.appendChild(el('span', 'writeup-meta-text', writeup.difficulty));
      }
      var publishedAt = formatMonth(writeup.publishedAt);
      if (publishedAt) {
        meta.appendChild(el('span', 'writeup-meta-text', publishedAt));
      }
      card.appendChild(meta);

      card.appendChild(el('h3', 'writeup-title', writeup.title));

      if (writeup.summary) {
        card.appendChild(el('p', 'writeup-summary', writeup.summary));
      }

      if (writeup.techniques && writeup.techniques.length) {
        var tech = el('div', 'writeup-tech');
        tech.appendChild(el('span', 'field-label', 'Techniques'));
        tech.appendChild(tagList(writeup.techniques));
        card.appendChild(tech);
      }

      var actions = el('div', 'writeup-actions');
      actions.appendChild(
        externalLink(writeup.articleUrl, 'Read Writeup', 'btn btn--secondary btn--sm', 'external-link')
      );
      card.appendChild(actions);

      list.appendChild(card);
    });
  }

  /* ==========================================================================
     3. LOCAL LAB REPORTS
     ========================================================================== */
  function lookupReport(id) {
    var reports = data.localReports || [];
    for (var i = 0; i < reports.length; i++) {
      if (reports[i].id === id) return reports[i];
    }
    return null;
  }

  function renderLocalReports() {
    var list = document.getElementById('local-reports');
    if (!list) return;

    (data.localReports || []).forEach(function (report) {
      var row = el('li', 'lab-report');

      var body = el('div', 'lab-report-body');
      var head = el('div', 'lab-report-head');
      head.appendChild(el('span', 'platform-label', report.area));
      body.appendChild(head);
      body.appendChild(el('h4', 'lab-report-title', report.title));
      body.appendChild(el('p', 'lab-report-summary', report.summary));
      row.appendChild(body);

      var label = report.area === 'Project Architecture' ? 'Read Project Breakdown' : 'Read Lab Report';
      var trigger = el('button', 'btn btn--secondary btn--sm', label);
      trigger.type = 'button';
      trigger.setAttribute('data-report-id', report.id);
      trigger.setAttribute('aria-haspopup', 'dialog');
      row.appendChild(trigger);

      list.appendChild(row);
    });
  }

  /* ==========================================================================
     4. CERTIFICATES
     ========================================================================== */
  function renderCertificates() {
    var grid = document.getElementById('certs-grid');
    if (!grid) return;

    (data.certificates || []).forEach(function (certificate, index) {
      var card = el('article', 'card cert-card');

      var certHead = el('div', 'cert-head');
      var number = String(index + 1);
      certHead.appendChild(el('span', 'cert-index', number.length < 2 ? '0' + number : number));
      certHead.appendChild(el('h3', 'cert-title', certificate.title));
      card.appendChild(certHead);

      var meta = el('dl', 'cert-meta');

      if (certificate.issuer) {
        var issuerRow = el('div', 'cert-meta-row');
        issuerRow.appendChild(el('dt', null, 'Issuer'));
        issuerRow.appendChild(el('dd', null, certificate.issuer));
        meta.appendChild(issuerRow);
      }

      var earnedAt = formatMonth(certificate.earnedAt);
      if (earnedAt) {
        var dateRow = el('div', 'cert-meta-row');
        dateRow.appendChild(el('dt', null, 'Earned'));
        dateRow.appendChild(el('dd', null, earnedAt));
        meta.appendChild(dateRow);
      }

      if (!certificate.issuer && !earnedAt) {
        var pendingRow = el('div', 'cert-meta-row');
        pendingRow.appendChild(el('dt', null, 'Details'));
        pendingRow.appendChild(el('dd', null, 'Issuer and date not yet provided'));
        meta.appendChild(pendingRow);
      }

      card.appendChild(meta);

      if (certificate.fileUrl || certificate.verificationUrl) {
        var actions = el('div', 'cert-actions');
        if (certificate.fileUrl) {
          actions.appendChild(
            externalLink(certificate.fileUrl, 'View Certificate', 'btn btn--secondary btn--sm', 'file-text')
          );
        }
        if (certificate.verificationUrl) {
          actions.appendChild(
            externalLink(
              certificate.verificationUrl,
              'Verify credential',
              'btn btn--secondary btn--sm',
              'external-link'
            )
          );
        }
        card.appendChild(actions);
      } else {
        card.appendChild(el('p', 'cert-state', 'Certificate not uploaded'));
      }

      grid.appendChild(card);
    });
  }

  /* ==========================================================================
     5. CONTACT, SOCIAL LINKS, RESUME
     ========================================================================== */
  function socialItem(link, className) {
    var anchor = el('a', className);
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.appendChild(icon(link.icon));
    anchor.appendChild(el('span', null, link.label));
    return anchor;
  }

  function renderContact() {
    var contact = data.contact || {};
    var email = contact.email;
    if (!email) return;

    var emailLink = document.getElementById('contact-email');
    if (emailLink) {
      emailLink.href = 'mailto:' + email;
      emailLink.textContent = email;
    }

    var copyButton = document.getElementById('copy-email');
    if (copyButton) {
      copyButton.setAttribute('data-email', email);
    }

    var socialList = document.getElementById('social-list');
    if (socialList) {
      (contact.links || []).forEach(function (link) {
        var item = el('li');
        item.appendChild(socialItem(link, 'social-link'));
        socialList.appendChild(item);
      });
    }

    var footerSocial = document.getElementById('footer-social');
    if (footerSocial) {
      (contact.links || []).forEach(function (link) {
        var item = el('li');
        item.appendChild(socialItem(link, null));
        footerSocial.appendChild(item);
      });
    }
  }

  /**
   * Keeps the section-head profile buttons in sync with content.js so the
   * GitHub and Medium URLs are maintained in one place only.
   */
  function syncProfileLinks() {
    var profiles = {
      github: data.githubProfileUrl,
      medium: data.mediumProfileUrl,
    };

    Object.keys(profiles).forEach(function (key) {
      if (!profiles[key]) return;
      var links = document.querySelectorAll('[data-profile-link="' + key + '"]');
      Array.prototype.forEach.call(links, function (link) {
        link.href = profiles[key];
      });
    });
  }

  function applyResumeState() {
    var resume = data.resume || {};
    var fileUrl = resume.fileUrl || null;
    var note = document.querySelector('[data-resume-note]');
    var fileNode = document.querySelector('[data-resume-file]');

    if (fileNode) {
      fileNode.textContent = fileUrl || 'No file configured';
    }

    if (note) {
      note.hidden = !resume.isPlaceholder;
    }

    var actions = document.querySelectorAll('[data-resume-action]');
    Array.prototype.forEach.call(actions, function (action) {
      if (!fileUrl) {
        action.removeAttribute('href');
        action.removeAttribute('download');
        action.removeAttribute('target');
        action.setAttribute('aria-disabled', 'true');
        action.setAttribute('tabindex', '-1');
        action.classList.add('btn--unavailable');
        if (note) {
          note.hidden = false;
          note.textContent = 'CV not yet available.';
        }
        return;
      }

      action.href = fileUrl;
      if (action.getAttribute('data-resume-action') === 'view') {
        action.target = '_blank';
        action.rel = 'noopener noreferrer';
      } else {
        action.setAttribute('download', '');
      }
    });
  }

  /* ==========================================================================
     6. NAVIGATION
     ========================================================================== */
  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    var mobileQuery = window.matchMedia('(max-width: 720px)');

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close section menu' : 'Open section menu');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('nav-open', open && mobileQuery.matches);
    }

    toggle.addEventListener('click', function () {
      var isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isExpanded);
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !nav.classList.contains('is-open')) return;
      setOpen(false);
      toggle.focus();
    });

    var onChange = function () {
      if (!mobileQuery.matches) setOpen(false);
    };

    if (typeof mobileQuery.addEventListener === 'function') {
      mobileQuery.addEventListener('change', onChange);
    } else if (typeof mobileQuery.addListener === 'function') {
      mobileQuery.addListener(onChange);
    }
  }

  /* ==========================================================================
     7. SCROLL SPY
     ========================================================================== */
  function initScrollSpy() {
    var links = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('main section[id]');
    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

    var ratios = new Map();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        var activeId = null;
        var bestRatio = 0;
        ratios.forEach(function (ratio, id) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            activeId = id;
          }
        });

        if (!activeId) return;

        Array.prototype.forEach.call(links, function (link) {
          var href = link.getAttribute('href');
          if (href === '#' + activeId) {
            link.setAttribute('aria-current', 'page');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: [0, 0.15, 0.35, 0.6, 1] }
    );

    Array.prototype.forEach.call(sections, function (section) {
      observer.observe(section);
    });
  }

  /* ==========================================================================
     8. REPORT DIALOG
     ========================================================================== */
  function sanitizeReportHtml(html) {
    var doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
    var root = doc.body.firstElementChild;

    var blocked = ['script', 'style', 'iframe', 'object', 'embed', 'link', 'meta', 'form', 'input', 'img'];

    blocked.forEach(function (tag) {
      Array.prototype.forEach.call(root.querySelectorAll(tag), function (node) {
        node.remove();
      });
    });

    Array.prototype.forEach.call(root.querySelectorAll('*'), function (node) {
      Array.prototype.slice.call(node.attributes).forEach(function (attribute) {
        var name = attribute.name.toLowerCase();
        var value = attribute.value || '';
        var isJsUrl = /^(href|src)$/.test(name) && /^\s*javascript:/i.test(value);
        if (name.indexOf('on') === 0 || isJsUrl) {
          node.removeAttribute(attribute.name);
        }
      });
    });

    return root.innerHTML;
  }

  function initDialog() {
    var dialog = document.getElementById('report-dialog');
    if (!dialog || typeof dialog.showModal !== 'function') return;

    var titleNode = document.getElementById('dialog-title');
    var areaNode = document.getElementById('dialog-area');
    var bodyNode = document.getElementById('dialog-body');
    var lastTrigger = null;

    function openReport(report, trigger) {
      if (!report) return;
      lastTrigger = trigger || null;

      titleNode.textContent = report.title;
      areaNode.textContent = report.area;
      bodyNode.innerHTML = sanitizeReportHtml(report.body || '');
      dialog.showModal();
      bodyNode.scrollTop = 0;
    }

    document.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-report-id]');
      if (!trigger) return;
      event.preventDefault();
      openReport(lookupReport(trigger.getAttribute('data-report-id')), trigger);
    });

    Array.prototype.forEach.call(dialog.querySelectorAll('[data-dialog-close]'), function (button) {
      button.addEventListener('click', function () {
        dialog.close();
      });
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
      lastTrigger = null;
    });
  }

  /* ==========================================================================
     9. COPY EMAIL
     ========================================================================== */
  function initCopyEmail() {
    var button = document.getElementById('copy-email');
    var toast = document.getElementById('copy-toast');
    if (!button || !toast) return;

    var timer = null;

    function showToast() {
      toast.setAttribute('data-visible', 'true');
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        toast.removeAttribute('data-visible');
      }, 2400);
    }

    function fallbackCopy(text) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand('copy');
        showToast();
      } catch (error) {
        console.warn('[portfolio] Copy failed', error);
      }
      document.body.removeChild(field);
    }

    button.addEventListener('click', function () {
      var email = button.getAttribute('data-email') || '';
      if (!email) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(showToast, function () {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });
  }

  /* ==========================================================================
     10. BOOT
     ========================================================================== */
  function initYear() {
    var node = document.getElementById('current-year');
    if (node) node.textContent = String(new Date().getFullYear());
  }

  function boot() {
    renderProjects();
    renderWriteups();
    renderLocalReports();
    renderCertificates();
    renderContact();
    syncProfileLinks();
    applyResumeState();

    initNav();
    initScrollSpy();
    initDialog();
    initCopyEmail();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
