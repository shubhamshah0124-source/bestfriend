/* =============================================
   BESTIE WEBSITE — FULL-SCREEN SLIDE JS
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── ELEMENTS ───
  const slides          = document.querySelectorAll('.slide');
  const nameInput      = document.getElementById('nameInput');
  const btnStart       = document.getElementById('btnStart');
  const nameDisplay    = document.getElementById('nameDisplay');
  const typedEl        = document.getElementById('typed');
  const btnRevealNext  = document.getElementById('btnRevealNext');
  const btnYes         = document.getElementById('btnYes');
  const btnNo          = document.getElementById('btnNo');
  const wrongMsg1      = document.getElementById('wrongMsg1');
  const quizQuestion   = document.getElementById('quizQuestion');
  const quizOptions    = document.getElementById('quizOptions');
  const wrongQuiz      = document.getElementById('wrongQuiz');
  const chaseArea      = document.getElementById('chaseArea');
  const chaseBtn       = document.getElementById('chaseBtn');
  const caughtText     = document.getElementById('caughtText');
  const rateOptions    = document.getElementById('rateOptions');
  const wrongRate      = document.getElementById('wrongRate');
  
  // Q&A Elements
  const qaStep         = document.getElementById('qaStep');
  const qaQuestion     = document.getElementById('qaQuestion');
  const qaAnswer       = document.getElementById('qaAnswer');
  const btnQaNext      = document.getElementById('btnQaNext');
  const qaSummaryCard  = document.getElementById('qaSummaryCard');
  const qaSummaryContent = document.getElementById('qaSummaryContent');
  const btnShareWa     = document.getElementById('btnShareWa');
  const btnCopyAnswers = document.getElementById('btnCopyAnswers');
  const shareNotice    = document.getElementById('shareNotice');

  // Compliments Elements
  const compEmoji      = document.getElementById('compEmoji');
  const compText       = document.getElementById('compText');
  const compCount      = document.getElementById('compCount');
  const btnCompliment  = document.getElementById('btnCompliment');
  const btnCompNext    = document.getElementById('btnCompNext');
  const complimentBubble = document.getElementById('complimentBubble');

  // Letter & Final Elements
  const envelope       = document.getElementById('envelope');
  const letter         = document.getElementById('letter');
  const letterName     = document.getElementById('letterName');
  const btnLetterNext  = document.getElementById('btnLetterNext');
  const finalName      = document.getElementById('finalName');
  const finalHearts    = document.getElementById('finalHearts');
  const promiseStack   = document.getElementById('promiseStack');
  const btnRestart     = document.getElementById('btnRestart');
  const canvas         = document.getElementById('confetti');
  const floatingBg     = document.getElementById('floatingBg');

  let bestieName = '';
  let currentSlide = 'slide-name';

  // ─── FLOATING BG ───
  (function initFloats() {
    const chars = ['♥','✿','❋','✦','❀','♥','♥','✿'];
    for (let i = 0; i < 18; i++) {
      const s = document.createElement('span');
      s.className = 'fl';
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      s.style.left = Math.random() * 100 + '%';
      s.style.fontSize = (0.7 + Math.random() * 1) + 'rem';
      s.style.animationDuration = (9 + Math.random() * 14) + 's';
      s.style.animationDelay = (Math.random() * 12) + 's';
      floatingBg.appendChild(s);
    }
  })();

  // ─── SLIDE NAVIGATION ───
  function goTo(id) {
    const cur = document.getElementById(currentSlide);
    const nxt = document.getElementById(id);
    if (!nxt || id === currentSlide) return;

    cur.classList.remove('active');
    cur.classList.add('exit');

    setTimeout(() => {
      cur.classList.remove('exit');
      nxt.classList.add('active');
      const inner = nxt.querySelector('.slide-inner');
      if (inner) {
        inner.style.animation = 'none';
        void inner.offsetHeight;
        inner.style.animation = '';
      }
      currentSlide = id;
    }, 400);
  }

  // ─── CONFETTI ───
  function boom() {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#f8b4c8','#d4b8e0','#fdd9b5','#e8647c','#e8c547','#fce4ec','#b8e6d0'];
    const pcs = [];
    for (let i = 0; i < 130; i++) {
      pcs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 5 + Math.random() * 8,
        h: 3 + Math.random() * 6,
        c: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - .5) * 5,
        vy: 2 + Math.random() * 4,
        r: Math.random() * 360,
        rs: (Math.random() - .5) * 12,
        o: 1,
      });
    }
    let f = 0;
    const max = 180;
    function draw() {
      if (f > max) { ctx.clearRect(0,0,canvas.width,canvas.height); return; }
      ctx.clearRect(0,0,canvas.width,canvas.height);
      pcs.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.r += p.rs; p.vy += .06;
        if (f > max - 50) p.o = Math.max(0, p.o - .025);
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r * Math.PI / 180);
        ctx.globalAlpha = p.o;
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
      });
      f++;
      requestAnimationFrame(draw);
    }
    draw();
  }

  // ─── SLIDE 1: Name Input ───
  nameInput.addEventListener('input', () => {
    btnStart.disabled = nameInput.value.trim().length === 0;
  });

  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !btnStart.disabled) submitName();
  });

  btnStart.addEventListener('click', submitName);

  function submitName() {
    bestieName = nameInput.value.trim();
    if (!bestieName) return;

    nameDisplay.textContent = bestieName;
    letterName.textContent = bestieName;
    finalName.textContent = bestieName;

    goTo('slide-reveal');
    setTimeout(() => boom(), 500);
    setTimeout(() => startTyping(), 800);
  }

  // ─── TYPING EFFECT ───
  function startTyping() {
    const words = [
      'amazing person ever ✨',
      'annoying (lovingly) bestie 😤',
      'beautiful soul I know 💕',
      'dramatic queen (same tbh) 👑',
      'irreplaceable human 🫶',
      'chaotic partner in crime 🔥',
    ];
    let wi = 0, ci = 0, del = false;
    function tick() {
      const w = words[wi];
      if (!del) {
        typedEl.textContent = w.substring(0, ci + 1);
        ci++;
        if (ci === w.length) { setTimeout(() => { del = true; tick(); }, 1800); return; }
      } else {
        typedEl.textContent = w.substring(0, ci - 1);
        ci--;
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, del ? 35 : 60);
    }
    tick();
  }

  btnRevealNext.addEventListener('click', () => goTo('slide-areyousure'));

  // ─── SLIDE 3: Are You Sure? ───
  const noMessages = [
    '"Maybe not"?! MAYBE NOT?! After everything?! 😤 Try again.',
    'Wrong answer bestie. I KNOW you didn\'t just click that. 😒',
    'I\'m going to pretend I didn\'t see that. Click the right one. NOW. 🙄',
    'Okay you\'re literally hurting my feelings. CLICK YES. 😭',
    'I\'m not letting you continue until you pick YES. Deal with it. 😈',
  ];
  let noCount = 0;

  btnNo.addEventListener('click', () => {
    wrongMsg1.classList.remove('hidden');
    wrongMsg1.textContent = noMessages[Math.min(noCount, noMessages.length - 1)];
    btnNo.classList.add('wrong-shake');
    setTimeout(() => btnNo.classList.remove('wrong-shake'), 500);
    noCount++;

    const scale = Math.max(0.5, 1 - noCount * 0.1);
    btnNo.style.transform = `scale(${scale})`;

    const yScale = Math.min(1.3, 1 + noCount * 0.05);
    btnYes.style.transform = `scale(${yScale})`;
  });

  btnYes.addEventListener('click', () => {
    btnYes.classList.add('correct-pick');
    wrongMsg1.classList.add('hidden');
    setTimeout(() => goTo('slide-quiz'), 600);
  });

  // ─── SLIDE 4: Quiz ───
  const quiz = {
    q: `What would ${bestieName || 'your bestie'} say you are?`,
    opts: [
      { text: '🗑️ Annoying & Clingy', wrong: true },
      { text: '😴 Boring & Forgettable', wrong: true },
      { text: '👑 The Best Thing That Ever Happened To Her', wrong: false },
      { text: '🤷 Just... okay I guess', wrong: true },
    ],
    wrongMsgs: [
      'WRONG! You KNOW that\'s not it. Pick again. 😤',
      'Are you TRYING to hurt my feelings?! WRONG! 😭',
      'I literally cannot believe you picked that. Try again. 🙄',
      'One more wrong answer and I\'m revoking your bestie card. 😒',
    ]
  };
  let quizWrong = 0;

  function buildQuiz() {
    quizQuestion.textContent = `What would ${bestieName} say you are?`;
    quizOptions.innerHTML = '';
    quiz.opts.forEach(o => {
      const b = document.createElement('button');
      b.className = 'btn-choice';
      b.textContent = o.text;
      b.addEventListener('click', () => {
        if (o.wrong) {
          wrongQuiz.classList.remove('hidden');
          wrongQuiz.textContent = quiz.wrongMsgs[Math.min(quizWrong, quiz.wrongMsgs.length - 1)];
          b.classList.add('wrong-shake');
          setTimeout(() => b.classList.remove('wrong-shake'), 500);
          quizWrong++;
          b.disabled = true;
          b.style.opacity = '.4';
        } else {
          b.classList.add('correct-pick');
          wrongQuiz.classList.add('hidden');
          boom();
          setTimeout(() => goTo('slide-runaway'), 800);
        }
      });
      quizOptions.appendChild(b);
    });
  }

  const quizObserver = new MutationObserver(() => {
    if (document.getElementById('slide-quiz').classList.contains('active')) {
      buildQuiz();
    }
  });
  quizObserver.observe(document.getElementById('slide-quiz'), { attributes: true, attributeFilter: ['class'] });

  // ─── SLIDE 5: Runaway Button ───
  let chaseAttempts = 0;
  const taunts = [
    'Too slow! 😝','Nope!','Try again!','Haha! 😂','Almost!',
    'Not today!','Can\'t touch this 💃','Lol nope','So close!',
    'Keep trying bestie 🤭','Getting warmer...','Jk no 😈',
    'I believe in you!','Almost!','One more!','OK fine come get me...',
  ];

  chaseBtn.addEventListener('mouseover', evade);
  chaseBtn.addEventListener('touchstart', (e) => { e.preventDefault(); evade(); }, { passive: false });

  function evade() {
    if (chaseAttempts > 14) return;
    chaseAttempts++;
    const rect = chaseArea.getBoundingClientRect();
    const bw = chaseBtn.offsetWidth;
    const bh = chaseBtn.offsetHeight;
    const maxX = rect.width - bw - 10;
    const maxY = rect.height - bh - 10;
    chaseBtn.style.left = Math.max(10, Math.random() * maxX) + 'px';
    chaseBtn.style.top  = Math.max(10, Math.random() * maxY) + 'px';
    chaseBtn.style.transform = 'none';
    chaseBtn.textContent = taunts[Math.min(chaseAttempts - 1, taunts.length - 1)];
  }

  chaseBtn.addEventListener('click', () => {
    chaseBtn.textContent = 'You got me! 🥹';
    chaseBtn.style.background = 'linear-gradient(135deg, #e8c547, #fdd9b5)';
    chaseBtn.style.pointerEvents = 'none';
    caughtText.classList.remove('hidden');
    boom();
    setTimeout(() => goTo('slide-rate'), 1500);
  });

  // ─── SLIDE 6: Rate Friendship ───
  const rateWrongMsgs = [
    'EXCUSE ME?! 😤 Wrong answer. The correct answer is THE BEST EVER.',
    '"Good"?! Not GREAT? Not THE BEST? I see how it is... 😒',
    'I\'m not mad, I\'m just disappointed. Try again. 🙄',
    'You literally have ONE job. Pick THE BEST EVER. 😭',
  ];
  let rateWrong = 0;

  rateOptions.querySelectorAll('.btn-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('btn-wrong')) {
        wrongRate.classList.remove('hidden');
        wrongRate.textContent = rateWrongMsgs[Math.min(rateWrong, rateWrongMsgs.length - 1)];
        btn.classList.add('wrong-shake');
        setTimeout(() => btn.classList.remove('wrong-shake'), 500);
        rateWrong++;
        btn.disabled = true;
        btn.style.opacity = '.4';
      } else {
        btn.classList.add('correct-pick');
        wrongRate.classList.add('hidden');
        boom();
        setTimeout(() => {
          initQaSlide();
          goTo('slide-qa');
        }, 800);
      }
    });
  });

  // ─── SLIDE 7: Interactive Bestie Q&A Logic ───
  const qaQuestionsList = [
    "What's your absolute favorite memory of us together? 📸",
    "If we were trapped on a deserted island, who would survive longer? 🏝️",
    "What's an inside joke that will make us laugh even when we're 80 years old? 👵",
    "What's one secret wish or promise for our future friendship? ✨"
  ];

  let currentQaIndex = 0;
  let userAnswers = [];

  function initQaSlide() {
    currentQaIndex = 0;
    userAnswers = [];
    showQaQuestion();
  }

  function showQaQuestion() {
    qaStep.textContent = `Question ${currentQaIndex + 1} of ${qaQuestionsList.length}`;
    qaQuestion.textContent = qaQuestionsList[currentQaIndex];
    qaAnswer.value = '';
    qaAnswer.placeholder = 'type your answer here...';
    btnQaNext.innerHTML = (currentQaIndex === qaQuestionsList.length - 1)
      ? 'Finish Q&A 💕 <span class="arrow">→</span>'
      : 'Next Question <span class="arrow">→</span>';
    setTimeout(() => qaAnswer.focus(), 300);
  }

  btnQaNext.addEventListener('click', () => {
    const val = qaAnswer.value.trim();
    userAnswers.push(val || '(no answer typed 🤫)');

    currentQaIndex++;
    if (currentQaIndex < qaQuestionsList.length) {
      showQaQuestion();
    } else {
      // 1. Save to local browser storage
      try {
        localStorage.setItem('bestie_answers_' + bestieName, JSON.stringify({
          name: bestieName,
          date: new Date().toLocaleDateString(),
          answers: userAnswers
        }));
      } catch (e) {}

      // 2. AUTOMATICALLY SUBMIT TO BACKEND SERVER
      fetch('/api/submit-answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bestieName,
          answers: qaQuestionsList.map((q, i) => ({
            question: q,
            answer: userAnswers[i] || '(no answer typed)'
          }))
        })
      }).then(res => res.json())
        .then(data => console.log('Automated submission response:', data))
        .catch(err => console.error('Automated submission error:', err));

      boom();
      goTo('slide-compliment');
    }
  });

  // Helper function to format answers string
  function getFormattedAnswersText() {
    let msg = `💕 Bestie Q&A Responses from ${bestieName}:\n\n`;
    qaQuestionsList.forEach((q, i) => {
      msg += `Q: ${q}\n`;
      msg += `A: ${userAnswers[i] || '...'}\n\n`;
    });
    msg += `— Sent from our Bestie Website! 👯‍♀️✨`;
    return msg;
  }

  // Send on WhatsApp Button
  btnShareWa.addEventListener('click', () => {
    const text = encodeURIComponent(getFormattedAnswersText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  });

  // Copy Answers Button
  btnCopyAnswers.addEventListener('click', () => {
    const text = getFormattedAnswersText();
    navigator.clipboard.writeText(text).then(() => {
      shareNotice.classList.remove('hidden');
      setTimeout(() => shareNotice.classList.add('hidden'), 3000);
    }).catch(() => {
      alert(text);
    });
  });

  // ─── SLIDE 8: Compliments ───
  let compIdx = 0;

  function getCompliments() {
    return [
      { e: '👑', t: `${bestieName}, you're literally the queen of everything.` },
      { e: '✨', t: `The world became 1000% brighter the day ${bestieName} was born.` },
      { e: '🌸', t: `${bestieName} doesn't need a filter. The filter needs ${bestieName}.` },
      { e: '💎', t: `Diamonds wish they were ${bestieName}. True story.` },
      { e: '🌈', t: `${bestieName}'s smile could end wars and make Mondays bearable.` },
    ];
  }

  btnCompliment.addEventListener('click', () => {
    const comps = getCompliments();
    if (compIdx >= comps.length) return;

    const c = comps[compIdx];
    compEmoji.textContent = c.e;
    compText.textContent = c.t;
    complimentBubble.classList.remove('pop');
    void complimentBubble.offsetHeight;
    complimentBubble.classList.add('pop');

    compIdx++;
    compCount.textContent = compIdx;

    if (compIdx >= comps.length) {
      btnCompliment.classList.add('hidden');
      btnCompNext.classList.remove('hidden');
    }
  });

  btnCompNext.addEventListener('click', () => goTo('slide-letter'));

  // ─── SLIDE 9: Letter ───
  envelope.addEventListener('click', () => {
    envelope.style.transform = 'scale(.85)';
    envelope.style.opacity = '0';
    envelope.style.transition = 'all .4s ease';
    setTimeout(() => {
      envelope.classList.add('hidden');
      letter.classList.remove('hidden');
    }, 400);
  });

  btnLetterNext.addEventListener('click', () => {
    buildFinal();
    goTo('slide-final');
    setTimeout(() => boom(), 500);
  });

  // ─── SLIDE 10: Final ───
  function buildFinal() {
    finalHearts.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const h = document.createElement('span');
      h.className = 'final-heart';
      h.textContent = '♥';
      h.style.left = Math.random() * 100 + '%';
      h.style.fontSize = (1 + Math.random() * 2) + 'rem';
      h.style.animationDuration = (5 + Math.random() * 8) + 's';
      h.style.animationDelay = (Math.random() * 6) + 's';
      finalHearts.appendChild(h);
    }

    if (userAnswers && userAnswers.length > 0) {
      qaSummaryCard.classList.remove('hidden');
      qaSummaryContent.innerHTML = '';
      qaQuestionsList.forEach((q, idx) => {
        const item = document.createElement('div');
        item.className = 'qa-item';
        item.innerHTML = `
          <div class="qa-item-q">${q}</div>
          <div class="qa-item-a">"${userAnswers[idx] || '...'}"</div>
        `;
        qaSummaryContent.appendChild(item);
      });
    } else {
      qaSummaryCard.classList.add('hidden');
    }

    const promises = [
      { e:'🤞', t:'I promise to <strong>always answer your calls</strong> at 2am' },
      { e:'🍦', t:'I promise to <strong>bring ice cream</strong> after every bad day' },
      { e:'🤐', t:'I promise to <strong>keep your secrets</strong> (mostly 😬)' },
      { e:'👯', t:'I promise to be <strong>your plus one</strong> forever' },
      { e:'🫂', t:'I promise to <strong>always be honest</strong> — even about that outfit' },
      { e:'♾️', t:'I promise to be <strong>your person, always</strong>. Pinky promise.' },
    ];

    promiseStack.innerHTML = '';
    promises.forEach((p, i) => {
      const d = document.createElement('div');
      d.className = 'promise-item';
      d.style.animationDelay = `${i * 0.15}s`;
      d.innerHTML = `<span class="promise-emoji">${p.e}</span><p class="promise-text">${p.t}</p>`;
      promiseStack.appendChild(d);
    });
  }

  btnRestart.addEventListener('click', () => {
    bestieName = '';
    nameInput.value = '';
    btnStart.disabled = true;
    noCount = 0;
    quizWrong = 0;
    chaseAttempts = 0;
    rateWrong = 0;
    compIdx = 0;
    currentQaIndex = 0;
    userAnswers = [];
    
    compCount.textContent = '0';
    compText.textContent = 'Press the button!';
    compEmoji.textContent = '✨';
    btnCompliment.classList.remove('hidden');
    btnCompNext.classList.add('hidden');
    caughtText.classList.add('hidden');
    wrongMsg1.classList.add('hidden');
    wrongQuiz.classList.add('hidden');
    wrongRate.classList.add('hidden');
    envelope.classList.remove('hidden');
    envelope.style = '';
    letter.classList.add('hidden');
    chaseBtn.textContent = 'Click Me!';
    chaseBtn.style = '';
    chaseBtn.style.position = 'absolute';
    chaseBtn.style.top = '50%';
    chaseBtn.style.left = '50%';
    chaseBtn.style.transform = 'translate(-50%,-50%)';
    btnYes.classList.remove('correct-pick');
    btnYes.style = '';
    btnNo.style = '';
    finalHearts.innerHTML = '';
    promiseStack.innerHTML = '';
    qaSummaryCard.classList.add('hidden');
    qaSummaryContent.innerHTML = '';

    rateOptions.querySelectorAll('.btn-choice').forEach(b => {
      b.disabled = false;
      b.style.opacity = '';
      b.classList.remove('correct-pick','wrong-shake');
    });

    goTo('slide-name');
    setTimeout(() => nameInput.focus(), 500);
  });

  // ─── RESIZE ───
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  setTimeout(() => nameInput.focus(), 400);
});
