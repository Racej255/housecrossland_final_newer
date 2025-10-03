/*
 * Interactive behaviours for House Crossland site
 *
 * This script powers the member modal overlay.  When a user clicks on
 * a member card the corresponding data is looked up from the
 * `membersData` map defined below and the modal is populated with a
 * larger portrait, title and descriptive text.  The modal can be
 * closed by clicking the close icon or anywhere outside the content.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('member-modal');
  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const modalRole = document.getElementById('modal-role');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.getElementById('modal-close');

  // Data describing each member.  You can extend this object with
  // additional members or adjust the descriptions without touching the
  // HTML markup.  If you provide higher‑resolution hero images for
  // members other than Marcus, specify the path in the `hero` field.
  const membersData = {
    marcus: {
      name: 'Marcus Crossland',
      role: 'House Steward – Master of Opportunity',
      hero: 'marcus-hero.png',
      desc: 'As the steward of House Crossland, Marcus is the beating heart of the Yeoman’s End. He’s the first to strike a deal and the last to leave the table, always ready with a clever plan and a winning smile. Under his guidance our house has grown from a handful of vagabonds into a force to be reckoned with.',
      category: 'active'
    },
    bron: {
      name: 'Bron Ashwood',
      role: 'Chief Negotiator – Purveyor of Games',
      hero: 'members/bron.png',
      desc: 'Bron Ashwood has an eye for negotiation and a steady hand at the games table. He ensures every deal is struck in our favour, counting cards and coin with the same sharp wit.',
      category: 'active'
    },
    elias: {
      name: 'Elias Reede',
      role: 'Master of Cudgels – Curator of Brawn',
      hero: 'members/elias.png',
      desc: 'Elias Reede is the muscle behind House Crossland. Whether guarding our assets or leading our warriors, his strength and loyalty keep the house safe.',
      category: 'active'
    },
    maxwell: {
      name: '“Daddy” Maxwell',
      role: 'Security Overseer – Collector of Secrets',
      hero: 'members/maxwell.png',
      desc: 'Captain “Daddy” Maxwell oversees our security and listens for whispers. Always watching, always listening, he ensures House Crossland stays one step ahead of those who would cross us.',
      category: 'active'
    },
    bill: {
      name: 'Boggy Bill',
      role: 'Master of Vagabonds – Fortune’s Favourite',
      hero: 'members/bill.png',
      desc: 'Boggy Bill leads the ragtag vagabonds who gather under our banner. His fortunes rise and fall with the toss of the dice and the spin of a tale.',
      category: 'retired'
    },
    dick: {
      name: 'Richard “Dick” Roper',
      role: 'Deal Broker – Merchant of Delectables',
      hero: 'members/Dick.png',
      desc: 'Richard “Dick” Roper brokers deals and supplies the finest delicacies. A merchant at heart, he knows the value of every morsel and secret.',
      category: 'active'
    },
    joshua: {
      name: 'Joshua Stone',
      role: 'Master of Arms – Military Powerhouse',
      hero: 'members/joshua.png',
      desc: 'Joshua Stone trains our fighters and leads them into battle. A powerhouse of martial skill, he stands as the blade and shield of House Crossland.',
      category: 'active'
    },
    robert: {
      name: 'Robert Crossland',
      role: 'House Bookkeeper – Keeper of Coin',
      hero: 'members/robert.png',
      desc: 'Robert Crossland keeps the books and watches the coin. Numbers dance at his fingertips, ensuring our coffers never run dry.',
      category: 'retired'
    },
    sadie: {
      name: 'Sadie Raine',
      role: 'Opportunity Weaver – Magical Liaison',
      hero: 'members/sadie.png',
      desc: 'Sadie Raine weaves magic into opportunity, bridging the mundane and mystical to ensure every endeavour is touched with a bit of wonder.',
      category: 'active'
    }
    ,
    // Additional active members
    kas: {
      name: 'Kaspian',
      role: 'Master of Games – Luck’s Champion',
      hero: 'members/Kas.png',
      desc: 'Kaspian is the house’s master of games and chance, always ready to spin fate in our favour. With a grin and a dice, he leads the charge when luck is on the line.',
      category: 'active'
    },
    agnesmaybel: {
      name: 'Agnes & Maybel',
      role: 'Culinary Enforcers – The Twin Butchers',
      hero: 'members/AgnesMaybel.png',
      desc: 'Agnes and Maybel, the twin butchers, are our culinary enforcers. They keep the house fed and our foes wary, wielding cleavers with precision and charm.',
      category: 'active'
    },
    harold: {
      name: 'Harold',
      role: 'Counselor – Voice of Reason',
      hero: 'members/Harold.png',
      desc: 'Harold is the voice of reason in the heat of battle. He keeps our spirits grounded and our spears steady, guiding us through turmoil with calm determination.',
      category: 'active'
    },
    maud: {
      name: 'Maud',
      role: 'Mistress of Fortune – Dice & Destiny',
      hero: 'members/Maud.png',
      desc: 'Maud walks the line between fortune and destiny. As our mistress of fortune, she reads the winds and whispers of chance, guiding House Crossland’s gambles.',
      category: 'active'
    },
    aelfred: {
      name: 'Aelfred',
      role: 'House Strategist – Schemer of Opportunities',
      hero: 'members/Aelfred.png',
      desc: 'Aelfred is the house strategist and schemer of opportunities. He sees pathways others miss and turns them into victories for House Crossland.',
      category: 'active'
    },
    // Fallen members
    mason: {
      name: 'Mason Manchester',
      role: 'Founding Member – Returned to his Farm',
      hero: 'members/mason.png',
      desc: 'Mason Manchester was among the founding members of House Crossland. He cultivated connections and camaraderie; now he tends his farm, leaving behind a legacy of loyalty.',
      category: 'retired'
    },
    broadwick: {
      name: 'Robert Broadwick',
      role: 'Founding Elder – Gone but Not Forgotten',
      hero: 'members/broadwick.png',
      desc: 'Robert Broadwick helped raise our banner in the early days. Though he has passed, his wisdom and spirit continue to guide our house.',
      category: 'dead'
    },
    anthony: {
      name: 'Anthony Bikker',
      role: 'Quartermaster – Logistics & Ledger',
      hero: 'members/anthony.png',
      desc: 'Anthony Bikker keeps our ledgers in line and our stores stocked. Though on hiatus, his meticulous eye ensures everything has its place.',
      category: 'retired'
    },
    harvest: {
      name: 'Brother Harvest',
      role: 'Spiritual Guide – Eternal Harvest',
      hero: 'members/harvest.png',
      desc: 'Brother Harvest tended to our hearts and souls. We honour his memory with every bowl of soup shared among friends.',
      category: 'dead'
    },
    daz: {
      name: 'Daz Rock',
      role: 'Crossland’s Champion – Laid to Rest',
      hero: 'members/daz.png',
      desc: 'Daz Rock stood tall at the Yeoman’s End and raised many a toast in our name. Though gone, his laughter still echoes in the hall.',
      category: 'dead'
    },
    waylon: {
      name: 'Waylon Fox',
      role: 'Wanderer – Friend to Many',
      hero: 'members/waylon.png',
      desc: 'Waylon Fox is our wandering storyteller and friend to many. Though retired, his warm smile and tales of adventure are never far from the hearth of the Yeoman’s End.',
      category: 'retired'
    },
    hector: {
      name: 'Hector Greenfield',
      role: 'Keeper of Games – Taking a break',
      hero: 'members/hector.png',
      desc: 'Hector Greenfield oversaw our games and amusements. He’s currently taking a well‑deserved break but remains a treasured friend of House Crossland.',
      category: 'retired'
    }
  };

  // Attach click handlers to all member cards
  document.querySelectorAll('.member-card').forEach(card => {
    const key = card.dataset.member;
    // Only bind if data exists
    if (membersData[key]) {
      card.addEventListener('click', () => {
        const data = membersData[key];
        modalImg.src = data.hero;
        modalName.textContent = data.name;
        modalRole.textContent = data.role;
        modalDesc.textContent = data.desc;
        modal.classList.remove('hidden');
      });
    }
  });

  // Close modal when clicking the close icon or outside the content
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      modal.classList.add('hidden');
    }
  });

  /*
   * Gallery lightbox functionality
   *
   * Collect all gallery images and allow them to be viewed in a modal
   * with next/prev navigation.  Captions come from the image alt text.
   */
  const galleryModal = document.getElementById('gallery-modal');
  const galleryImg = document.getElementById('gallery-modal-img');
  const galleryCaption = document.getElementById('gallery-modal-caption');
  const galleryClose = document.getElementById('gallery-modal-close');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  // Gather sources from the carousel instead of the gallery grid
  const gallerySources = Array.from(document.querySelectorAll('.carousel-slide img')).map(img => ({ src: img.getAttribute('src'), caption: img.getAttribute('alt') || '' }));
  let galleryIndex = 0;

  function openGallery(i) {
    galleryIndex = i;
    const item = gallerySources[galleryIndex];
    galleryImg.src = item.src;
    galleryCaption.textContent = item.caption;
    galleryModal.classList.remove('hidden');
  }

  // Bind click to each slide image to open the lightbox
  document.querySelectorAll('.carousel-slide img').forEach((img, i) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      openGallery(i);
    });
  });

  if (galleryClose) {
    galleryClose.addEventListener('click', () => {
      galleryModal.classList.add('hidden');
    });
  }
  if (galleryModal) {
    galleryModal.addEventListener('click', evt => {
      if (evt.target === galleryModal) {
        galleryModal.classList.add('hidden');
      }
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', evt => {
      evt.stopPropagation();
      galleryIndex = (galleryIndex - 1 + gallerySources.length) % gallerySources.length;
      openGallery(galleryIndex);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', evt => {
      evt.stopPropagation();
      galleryIndex = (galleryIndex + 1) % gallerySources.length;
      openGallery(galleryIndex);
    });
  }

  /* Carousel functionality for the gallery */
  const carouselTrack = document.querySelector('.carousel-track');
  const carouselSlides = Array.from(carouselTrack.children);
  const prevCarousel = document.querySelector('.carousel-prev');
  const nextCarousel = document.querySelector('.carousel-next');
  let carouselIndex = 0;

  function updateCarousel() {
    carouselTrack.style.transform = `translateX(-${carouselIndex * 100}%)`;
  }

  if (nextCarousel) {
    nextCarousel.addEventListener('click', evt => {
      evt.stopPropagation();
      carouselIndex = (carouselIndex + 1) % carouselSlides.length;
      updateCarousel();
    });
  }
  if (prevCarousel) {
    prevCarousel.addEventListener('click', evt => {
      evt.stopPropagation();
      carouselIndex = (carouselIndex - 1 + carouselSlides.length) % carouselSlides.length;
      updateCarousel();
    });
  }
});