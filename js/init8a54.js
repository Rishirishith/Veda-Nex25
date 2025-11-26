$.fn.frenifyMoveCursorToEnd = function () {
  "use strict";
  this.focus();
  var e = this.val();
  return this.val("").val(e), this;
};
var FrenifyTechWaveTime = new Date();
!(function (e) {
  "use strict";
  var t = 0,
    a = !1,
    o = !1,
    n = "",
    s = "",
    i = 0,
    r = {
      init: function () {
        this.marquee(),
          this.tooltip(),
          this.fontDialog(),
          this.modelTabs(),
          this.bookmark(),
          this.contactForm(),
          this.negativePrompt(),
          this.imageGenerationSidebar(),
          this.rangeSlider(),
          this.quantity(),
          this.selectModel(),
          this.anchor(),
          this.aiChatBot__chat(),
          this.aiChatBotOptions(),
          this.aiChatBotTextareaHeight(),
          this.billingProgress(),
          this.inputFileOnChange(),
          this.optionsList(),
          this.pricingTab(),
          this.feedFilters(),
          this.report(),
          this.follow(),
          this.copyLink(),
          this.galleryIsotope(),
          this.imageLightbox(),
          this.like(),
          this.accordion(),
          this.search(),
          this.animatedText(),
          this.movingSubMenuForLeftPanel(),
          this.panelResize(),
          this.navBarItems(),
          this.redetectFullScreen(),
          this.fullSCreen(),
          this.navSubMenu(),
          this.imgToSVG(),
          this.BgImg(),
          this.popupMobile();
      },
      marquee: function () {
        e(".TickerNews .marquee").each(function () {
          var t = e(this);
          t.hasClass("ready") ||
            t
              .addClass("ready")
              .marquee({
                duplicated: !0,
                duration: 1e3 * parseInt(t.data("speed")),
                delayBeforeStart: 0,
                direction: "left",
                startVisible: !0,
              });
        });
      },
      popupMobile: function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
          var t = e(".techwave_fn_wrapper").width();
          e(".item__popup,.fn__nav_bar .item_popup").each(function () {
            var a = e(this),
              o = a.parent(),
              n = t - 20,
              s = Math.min(n, 300),
              i = o.offset().left,
              r = 10 - i + (n - s) / 2,
              l = "auto";
            "right" === a.data("position")
              ? i + o.width() > s && ((r = "auto"), (l = 0))
              : i + s < n && (r = 0),
              a.css({ maxWidth: s, width: s, left: r, right: l });
          });
        } else e(".fn__nav_bar .item_popup,.item__popup").attr("style", "");
      },
      tooltip: function () {
        e("body").on("mouseover mouseenter", ".fn__tooltip", function () {
          var t = e(this),
            a = t.attr("data-position");
          (void 0 === a || !0 === a) &&
            (a = ["top", "bottom", "right", "left"]);
          var o = {
            contentAsHTML: "true",
            maxWidth: 300,
            animationDuration: 0,
            animation: "fade",
            delay: 0,
            theme: "tooltipster-techwave",
            side: a,
          };
          if (t.hasClass("menu__item") && !e("html").hasClass("panel-opened")) {
            t.tooltipster(o).tooltipster("hide");
            return;
          }
          t.tooltipster(o), t.tooltipster("show");
        });
      },
      fontDialog: function () {
        var t = e(".techwave_fn_font");
        e(".font__trigger")
          .off()
          .on("click", function () {
            return t.addClass("opened"), !1;
          }),
          t
            .find(".font__closer")
            .off()
            .on("click", function () {
              return t.removeClass("opened"), !1;
            }),
          t
            .find(".font__closer_link")
            .off()
            .on("click", function () {
              return t.removeClass("opened"), !1;
            }),
          t
            .find(".apply")
            .off()
            .on("click", function () {
              return (
                e(".fn__chat_font_size_style").remove(),
                e("body").append(
                  '<style type="text/css" class="fn__chat_font_size_style">frenify_typing h3,.fn__chatbot .chat{font-size: ' +
                    e("#font_size").find(":selected").val() +
                    "px;}</style>"
                ),
                t.removeClass("opened"),
                !1
              );
            });
      },
      modelTabs: function () {
        e(".techwave_fn_models .fn__tabs a")
          .off()
          .on("click", function () {
            var t = e(this);
            if (!t.hasClass("active") && !o) {
              (o = !0),
                t.siblings().removeClass("active"),
                t.addClass("active");
              var a = t.closest(".techwave_fn_models");
              a.find(".models__results").addClass("loading"),
                setTimeout(function () {
                  a.find(".models__results").removeClass("loading"),
                    a.find(".tab__item.active").removeClass("active"),
                    e(t.attr("href")).addClass("active"),
                    (o = !1);
                }, 1500);
            }
            return !1;
          });
      },
      contactForm: function () {
        e("#send_message").on("click", function () {
          var t = e(".fn_contact_form #name").val(),
            a = e(".fn_contact_form #email").val(),
            o = e(".fn_contact_form #tel").val(),
            n = e(".fn_contact_form #message").val(),
            s = e(".fn_contact_form .returnmessage").data("success");
          return (
            e(".fn_contact_form .returnmessage").empty(),
            "" === t || "" === a || "" === n
              ? e(".fn_contact_form .empty_notice")
                  .slideDown(500)
                  .delay(2e3)
                  .slideUp(500)
              : e.post(
                  "modal/contact.html",
                  { ajax_name: t, ajax_email: a, ajax_message: n, ajax_tel: o },
                  function (t) {
                    e(".fn_contact_form .returnmessage").append(t),
                      e(".fn_contact_form .returnmessage span.contact_error")
                        .length
                        ? e(".fn_contact_form .returnmessage")
                            .slideDown(500)
                            .delay(2e3)
                            .slideUp(500)
                        : (e(".fn_contact_form .returnmessage").append(
                            "<span class='contact_success'>" + s + "</span>"
                          ),
                          e(".fn_contact_form .returnmessage")
                            .slideDown(500)
                            .delay(4e3)
                            .slideUp(500)),
                      "" === t && e("#fn_contact_form")[0].reset();
                  }
                ),
            !1
          );
        });
      },
      negativePrompt: function () {
        e("#negative_prompt").on("change", function () {
          this.checked
            ? e(".techwave_fn_image_generation_page .exclude_area").slideDown(
                200
              )
            : e(".techwave_fn_image_generation_page .exclude_area").slideUp(
                200
              );
        });
      },
      imageGenerationSidebar: function () {
        e(".techwave_fn_image_generation_page .sidebar__trigger")
          .off()
          .on("click", function () {
            return e(".techwave_fn_wrapper").toggleClass("fn__has_sidebar"), !1;
          });
      },
      rangeSlider: function () {
        e(".fn__range").each(function () {
          var t = e(this),
            a = t.find("input"),
            o = a.val(),
            n = t.find(".value"),
            s = a.attr("min"),
            i = a.attr("max"),
            r = t.find(".slider");
          r.css({ width: (o * (100 * s)) / i + "%" }),
            a.on("input", function () {
              (o = e(this).val()),
                n.text(o),
                r.css({ width: (o * (100 * s)) / i + "%" });
            });
        });
      },
      quantity: function () {
        e(".fn__quantity .increase")
          .off()
          .on("click", function () {
            var t = e(this).closest(".fn__quantity").find("input"),
              a = parseInt(t.attr("max"), 10),
              o = parseInt(t.val(), 10);
            return (o = isNaN(o) ? 0 : o), a !== o && (o++, t.val(o), !1);
          }),
          e(".fn__quantity .decrease")
            .off()
            .on("click", function () {
              var t = e(this).closest(".fn__quantity").find("input"),
                a = parseInt(t.val(), 10),
                o = parseInt(t.attr("min"), 10);
              return (a = isNaN(a) ? 0 : a), o !== a && (a--, t.val(a), !1);
            });
      },
      selectModel: function () {
        e(".fn__select_model .model_open")
          .off()
          .on("click", function () {
            return (
              e(this).closest(".fn__select_model").toggleClass("opened"), !1
            );
          }),
          e(window).on("click", function () {
            e(".fn__select_model").removeClass("opened");
          }),
          e(".fn__select_model .all_models").on("click", function (e) {
            e.stopPropagation();
          });
      },
      anchor: function () {
        e(".techwave_fn_doc_page .docsidebar li.menu-item-has-children > a")
          .off()
          .on("click", function () {
            return e(this).siblings("ul").slideToggle(), !1;
          }),
          e().onePageNav &&
            e(".techwave_fn_doc_page .docsidebar > ul").onePageNav();
      },
      aiChatBot__chat: function () {
        e("#fn__chat_textarea").length &&
          !e(".techwave_fn_intro").length &&
          e("#fn__chat_textarea").focus(),
          e("#fn__chat_textarea").keypress(function (t) {
            var a = t.keyCode ? t.keyCode : t.which;
            if (13 === a && t.shiftKey);
            else if (13 === a)
              return e(".fn__chat_comment button").trigger("click"), !1;
          }),
          e(".fn__chat_comment button")
            .off()
            .on("click", function () {
              var t = e(this),
                a = e("#fn__chat_textarea"),
                o = a.val();
              if (!("" === o || t.hasClass("disabled"))) {
                s = o = o.replace(/\n\r?/g, "<br />");
                var n = e(".fn__chatbot .chat__item.active"),
                  i =
                    '<div class="chat__box your__chat"><div class="author"><span>You</span></div><div class="chat"><p>' +
                    o +
                    "</p></div></div>";
                if (
                  (e(".fn__chat_comment").removeClass("neww"),
                  "chat0" === n.attr("id"))
                ) {
                  n.removeClass("active"),
                    e(".fn__new_chat_link").removeClass("active");
                  var l = e(".fn__chatbot .chat__item").length;
                  e(".fn__chatbot .chat__list").append(
                    '<div class="chat__item active" id="chat' +
                      l +
                      '">' +
                      i +
                      "</div>"
                  );
                  
                  // Generate meaningful chat title based on user input
                  var chatTitle = "New Chat";
                  var userInput = o.toLowerCase();
                  
                  // Generate title based on detected keywords
                  if (userInput.includes('diabetes')) chatTitle = "Diabetes Treatment";
                  else if (userInput.includes('blood pressure') || userInput.includes('hypertension')) chatTitle = "Blood Pressure Care";
                  else if (userInput.includes('joint pain') || userInput.includes('arthritis')) chatTitle = "Joint Pain Relief";
                  else if (userInput.includes('stomach') || userInput.includes('indigestion')) chatTitle = "Digestive Health";
                  else if (userInput.includes('sleep') || userInput.includes('insomnia')) chatTitle = "Sleep Disorders";
                  else if (userInput.includes('asthma') || userInput.includes('breathing')) chatTitle = "Respiratory Issues";
                  else if (userInput.includes('headache') || userInput.includes('migraine')) chatTitle = "Headache Treatment";
                  else if (userInput.includes('weight') || userInput.includes('obesity')) chatTitle = "Weight Management";
                  else if (userInput.includes('thyroid')) chatTitle = "Thyroid Care";
                  else if (userInput.includes('skin') || userInput.includes('acne')) chatTitle = "Skin Problems";
                  else {
                    // Generate title from first few words
                    var words = o.replace(/<br\s*\/?>/mg, ' ').split(' ');
                    if (words.length > 2) {
                      chatTitle = words.slice(0, 2).join(' ') + '...';
                    } else {
                      chatTitle = o.replace(/<br\s*\/?>/mg, ' ');
                    }
                    if (chatTitle.length > 20) {
                      chatTitle = chatTitle.substring(0, 17) + '...';
                    }
                  }
                  
                  var h =
                    '<li class="group__item"><div class="fn__chat_link active" href="#chat' +
                    l +
                    '"><span class="text">' + chatTitle + '</span><input type="text" value="' + chatTitle + '"><span class="options"><button class="trigger"><span></span></button><span class="options__popup"><span class="options__list"><button class="edit">Edit</button><button class="delete">Delete</button></span></span></span><span class="save_options"><button class="save"><img src="svg/check.svg" alt="" class="fn__svg"></button><button class="cancel"><img src="svg/close.svg" alt="" class="fn__svg"></button></span></div></li>';
                  e(".fn__chatbot .chat__group.new").length
                    ? e(".fn__chatbot .chat__group.new ul").append(h)
                    : e(".fn__chatbot .sidebar_content").prepend(
                        '<div class="chat__group new"><h2 class="group__title">Past Conversations</h2><ul class="group__list">' +
                          h +
                          "</ul></div>"
                      ),
                    r.imgToSVG(),
                    r.aiChatBotOptions();
                } else n.append(i);
                return (
                  a.val(""),
                  a.siblings(".fn__hidden_textarea").val(""),
                  r.aiChatBotTextareaHeight(),
                  e(".techwave_fn_intro").length
                    ? e("html, body").animate({
                        scrollTop: a.offset().top - e(window).height() + 100,
                      })
                    : e("html, body").animate({
                        scrollTop: e(document).height() - e(window).height(),
                      }),
                  a.frenifyMoveCursorToEnd(),
                  r.frenifyChat(),
                  !1
                );
              }
            });
      },
      frenifyChat: function () {
        var t = "",
          a = !0,
          o = "",
          i = e(".fn__chatbot .chat__item.active .chat__box").length;
        
        // CSV Disease Database - Integrated Medical Knowledge
        var csvDiseaseDB = [
          {name: "Migraine", symptoms: "Severe headache, nausea, sensitivity to light and sound", treatment: "Shirodhara", procedure: "Continuous pouring of medicated oil on the forehead", precautions: "Avoid exposure to strong sunlight"},
          {name: "Arthritis", symptoms: "Joint pain, stiffness, swelling", treatment: "Panchakarma therapies", procedure: "Massage and herbal steam therapy", precautions: "Avoid cold and damp environments"},
          {name: "Common Cold", symptoms: "Runny nose, sore throat, cough, sneezing", treatment: "Herbal remedies and dietary changes", procedure: "Drink warm fluids, rest", precautions: "Rest adequately, avoid cold exposure"},
          {name: "Hypertension", symptoms: "High blood pressure, headaches, dizziness, fatigue", treatment: "Panchakarma therapies", procedure: "Herbal treatments and dietary modifications", precautions: "Avoid salty and fatty foods, manage stress"},
          {name: "Diabetes", symptoms: "Polyuria, polydipsia, fatigue, blurred vision", treatment: "Herbal remedies and dietary changes", procedure: "Internal cleansing therapies (Panchakarma)", precautions: "Monitor blood sugar levels regularly, maintain a healthy diet and exercise regimen"},
          {name: "Acne", symptoms: "Variety of pimples, blackheads, whiteheads", treatment: "Herbal treatments and dietary changes", procedure: "External therapies like herbal face packs and oils", precautions: "Keep skin clean, avoid squeezing pimples"},
          {name: "Asthma", symptoms: "Shortness of breath, wheezing, coughing", treatment: "Panchakarma therapies", procedure: "Herbal remedies and breathing exercises", precautions: "Avoid triggers like allergens, maintain good indoor air quality"},
          {name: "Gastritis", symptoms: "Abdominal pain, bloating, nausea, vomiting", treatment: "Herbal treatments and dietary changes", procedure: "Internal cleansing therapies (Panchakarma)", precautions: "Avoid spicy, acidic, and fried foods, eat smaller meals"},
          {name: "Constipation", symptoms: "Difficulty in passing stools, bloating, discomfort", treatment: "Herbal remedies and dietary changes", procedure: "Internal cleansing therapies (Panchakarma)", precautions: "Drink plenty of water, eat fiber-rich foods, exercise regularly"},
          {name: "Dengue Fever", symptoms: "High fever, severe headache, joint and muscle pain", treatment: "Herbal treatments and supportive care", procedure: "Rest and hydration", precautions: "Prevent mosquito bites, avoid aspirin and NSAIDs"},
          {name: "Insomnia", symptoms: "Difficulty in falling asleep or staying asleep", treatment: "Herbal remedies and lifestyle changes", procedure: "Relaxation techniques and sleep hygiene practices", precautions: "Avoid caffeine and heavy meals before bedtime, establish a bedtime routine"},
          {name: "Obesity", symptoms: "Excessive body weight", treatment: "Herbal treatments and dietary changes", procedure: "Physical exercises and lifestyle modifications", precautions: "Avoid junk food and sugary beverages, maintain regular meal timings"},
          {name: "Rheumatoid Arthritis", symptoms: "Joint pain, swelling, stiffness", treatment: "Panchakarma therapies", procedure: "Herbal remedies and dietary changes", precautions: "Avoid excessive physical exertion, maintain joint mobility exercises"},
          {name: "Psoriasis", symptoms: "Red patches of skin covered with thick, silvery scales", treatment: "Herbal treatments and dietary changes", procedure: "External therapies like medicated oils and baths", precautions: "Avoid skin injuries, manage stress"},
          {name: "Urinary Tract Infection", symptoms: "Burning sensation during urination, frequent urge to urinate", treatment: "Herbal treatments and dietary changes", procedure: "Drink plenty of water, maintain good hygiene practices", precautions: "Maintain proper hygiene, stay hydrated"},
          {name: "Hypothyroidism", symptoms: "Fatigue, weight gain, dry skin, cold intolerance", treatment: "Herbal treatments and dietary changes", procedure: "Thyroid balancing therapies and lifestyle modifications", precautions: "Regular monitoring of thyroid hormone levels, maintain a balanced diet"},
          {name: "Liver Cirrhosis", symptoms: "Fatigue, jaundice, abdominal pain", treatment: "Herbal treatments and dietary changes", procedure: "Supportive therapies for liver detoxification and regeneration", precautions: "Avoid alcohol and fatty foods, maintain a balanced diet"},
          {name: "Gout", symptoms: "Severe pain, swelling, redness in joints (often in big toe)", treatment: "Herbal treatments and dietary changes", procedure: "Internal cleansing therapies (Panchakarma)", precautions: "Avoid purine-rich foods (like red meat and alcohol), maintain hydration"},
          {name: "Anxiety Disorders", symptoms: "Excessive worry, restlessness, difficulty concentrating", treatment: "Panchakarma therapies", procedure: "Herbal remedies and relaxation techniques", precautions: "Practice stress management, maintain a regular routine"},
          {name: "Hemorrhoids", symptoms: "Painful swellings in the anal area, bleeding during bowel movements", treatment: "Herbal treatments and dietary changes", procedure: "Local applications and internal therapies", precautions: "Avoid straining during bowel movements, maintain regular bowel habits"},
          {name: "Menstrual Disorders", symptoms: "Painful periods, irregular menstrual cycles", treatment: "Herbal treatments and dietary changes", procedure: "Pain-relieving therapies and lifestyle adjustments", precautions: "Manage stress, maintain a healthy diet and exercise"},
          {name: "Back Pain", symptoms: "Lower back pain, stiffness, muscle spasms, difficulty in movement", treatment: "Panchakarma therapies, herbal treatments", procedure: "Oil massage, herbal steam therapy, spine strengthening exercises", precautions: "Avoid heavy lifting, maintain proper posture, sleep on firm mattress"},
          {name: "Osteoporosis", symptoms: "Weak and brittle bones, fractures", treatment: "Herbal treatments and dietary changes", procedure: "Bone-strengthening therapies and lifestyle modifications", precautions: "Avoid smoking and excessive alcohol, ensure adequate calcium and vitamin D intake"},
          {name: "Eczema", symptoms: "Itchy, inflamed skin, red patches", treatment: "Herbal treatments and dietary changes", procedure: "External therapies and lifestyle modifications", precautions: "Avoid triggers (like allergens and harsh soaps), keep skin moisturized"},
          {name: "Stroke", symptoms: "Difficulty in speaking, numbness or weakness in face, arm, or leg", treatment: "Herbal treatments and supportive care", procedure: "Rehabilitation therapies and lifestyle modifications", precautions: "Seek immediate medical attention, manage risk factors like hypertension and diabetes"},
          {name: "Alzheimer's Disease", symptoms: "Memory loss, cognitive decline, confusion", treatment: "Herbal treatments and cognitive therapies", procedure: "Supportive care and lifestyle modifications", precautions: "Provide a safe environment, engage in mental stimulation activities"},
          {name: "Cancer", symptoms: "Varies based on type (e.g., lump, prolonged cough, changes in bowel habits)", treatment: "Herbal treatments and supportive care", procedure: "Medical treatments (like chemotherapy and surgery)", precautions: "Follow oncologist's recommendations, maintain overall health"},
          {name: "Parkinson's Disease", symptoms: "Tremors, stiffness, slow movement", treatment: "Herbal treatments and supportive care", procedure: "Physical therapy and lifestyle modifications", precautions: "Avoid falls, ensure a safe living environment"},
          {name: "Chronic Fatigue Syndrome", symptoms: "Severe fatigue not relieved by rest", treatment: "Herbal treatments and supportive care", procedure: "Energy-enhancing therapies and lifestyle adjustments", precautions: "Manage stress, maintain a balanced routine"},
          {name: "Irritable Bowel Syndrome", symptoms: "Abdominal pain, bloating, diarrhea or constipation", treatment: "Herbal treatments and dietary changes", procedure: "Stress management techniques and lifestyle adjustments", precautions: "Avoid trigger foods, maintain regular meals"},
          {name: "Kidney Stones", symptoms: "Severe pain in the side and back, blood in urine", treatment: "Herbal treatments and dietary changes", procedure: "Fluid intake and supportive care", precautions: "Avoid dehydration, follow dietary recommendations"},
          {name: "Gallstones", symptoms: "Abdominal pain (often after meals), nausea, vomiting", treatment: "Herbal treatments and dietary changes", procedure: "Supportive care and lifestyle modifications", precautions: "Avoid high-fat foods, maintain a healthy weight"},
          {name: "Anemia", symptoms: "Fatigue, weakness, pale skin", treatment: "Herbal treatments and dietary changes", procedure: "Blood-building therapies and supportive care", precautions: "Ensure adequate iron intake, follow dietary recommendations"},
          {name: "Chronic Bronchitis", symptoms: "Persistent cough, mucus production", treatment: "Herbal treatments and dietary changes", procedure: "Respiratory therapies and lifestyle modifications", precautions: "Avoid smoke and air pollutants, maintain good indoor air quality"},
          {name: "Cataracts", symptoms: "Blurred vision, sensitivity to light", treatment: "Herbal treatments and supportive care", procedure: "Surgical interventions and lifestyle modifications", precautions: "Avoid excessive UV exposure, maintain regular eye check-ups"},
          {name: "Depression", symptoms: "Sadness, loss of interest, changes in appetite or sleep", treatment: "Herbal treatments and supportive care", procedure: "Psychotherapy and lifestyle modifications", precautions: "Engage in social activities, maintain a regular routine"},
          {name: "Osteoarthritis", symptoms: "Joint pain, stiffness, limited range of motion", treatment: "Herbal treatments and dietary changes", procedure: "Physical therapies and lifestyle modifications", precautions: "Avoid excessive joint stress, maintain a healthy weight"},
          {name: "GERD", symptoms: "Heartburn, acid reflux", treatment: "Herbal treatments and dietary changes", procedure: "Supportive care and lifestyle modifications", precautions: "Avoid trigger foods (like spicy and fatty foods), maintain upright posture after meals"},
          {name: "Chronic Kidney Disease", symptoms: "Fatigue, swelling in ankles, changes in urination", treatment: "Herbal treatments and dietary changes", procedure: "Kidney-supportive therapies and lifestyle modifications", precautions: "Monitor kidney function, manage underlying conditions"},
          {name: "Hypertrophic Cardiomyopathy", symptoms: "Chest pain, shortness of breath, palpitations", treatment: "Herbal treatments and supportive care", procedure: "Cardiac therapies and lifestyle modifications", precautions: "Avoid strenuous activities, monitor heart health"},
          {name: "Multiple Sclerosis", symptoms: "Fatigue, numbness or weakness in limbs, vision problems", treatment: "Herbal treatments and supportive care", procedure: "Physical therapies and lifestyle modifications", precautions: "Manage symptoms, maintain a balanced routine"},
          {name: "COPD", symptoms: "Shortness of breath, chronic cough, wheezing", treatment: "Herbal treatments and supportive care", procedure: "Respiratory therapies and lifestyle modifications", precautions: "Avoid smoke and air pollutants, maintain good lung function"},
          {name: "Gallbladder Cancer", symptoms: "Abdominal pain, jaundice, unexplained weight loss", treatment: "Herbal treatments and supportive care", procedure: "Medical treatments (like surgery and chemotherapy)", precautions: "Follow oncologist's recommendations, maintain overall health"},
          {name: "Peptic Ulcer Disease", symptoms: "Abdominal pain (often relieved by eating), bloating, nausea", treatment: "Herbal treatments and dietary changes", procedure: "Supportive care and lifestyle modifications", precautions: "Avoid NSAIDs and smoking, manage stress"},
          {name: "Ovarian Cancer", symptoms: "Abdominal pain or swelling, bloating, changes in bowel habits", treatment: "Herbal treatments and supportive care", procedure: "Medical treatments (like surgery and chemotherapy)", precautions: "Follow oncologist's recommendations, maintain overall health"},
          {name: "Prostate Cancer", symptoms: "Difficulty urinating, blood in urine or semen", treatment: "Herbal treatments and supportive care", procedure: "Medical treatments (like surgery and radiation)", precautions: "Follow oncologist's recommendations, maintain overall health"}
        ];

        // Enhanced CSV Disease Matcher Function
        // Advanced Natural Language Processing for All Query Types
        function analyzeNaturalLanguage(input) {
          const normalizedInput = input.toLowerCase();
          
          // 1. GENERAL KNOWLEDGE & COMMON QUESTIONS
          const generalPatterns = [
            {
              pattern: /(?:what is|what are|tell me about|explain|define|meaning of)\s+(ayurveda|ayurvedic|yoga|meditation|pranayama|chakra|chakras|dosha|doshas|vata|pitta|kapha|panchakarma|herbs|herbal medicine|natural healing|holistic health|traditional medicine)/,
              response: () => generateAyurvedaKnowledgeResponse()
            },
            {
              pattern: /(?:how to|how can i|ways to|methods to|steps to)\s+(stay healthy|be healthy|maintain health|improve health|boost immunity|lose weight|gain weight|reduce stress|manage stress|sleep better|meditate|do yoga|practice ayurveda)/,
              response: () => generateHealthTipsResponse()
            },
            {
              pattern: /(?:what time|current time|time now|what's the time)/,
              response: () => `<div style='background: #e3f2fd; padding: 15px; border-radius: 8px;'><h4>🕐 Current Time</h4><p>The current time is: <strong>${new Date().toLocaleTimeString()}</strong></p><p>Date: <strong>${new Date().toLocaleDateString()}</strong></p></div>`
            },
            {
              pattern: /(?:hello|hi|hey|good morning|good afternoon|good evening|namaste|greetings)/,
              response: () => generateGreetingResponse()
            },
            {
              pattern: /(?:thank you|thanks|appreciate|grateful)/,
              response: () => `<div style='background: #f3e5f5; padding: 15px; border-radius: 8px;'><h4>🙏 You're Welcome!</h4><p>I'm glad I could help! Feel free to ask me anything about health, Ayurveda, or general wellness. I'm here to support your journey to better health! 😊</p></div>`
            },
            {
              pattern: /(?:who are you|what are you|your name|about you|introduce yourself)/,
              response: () => `<div style='background: #e8f5e8; padding: 15px; border-radius: 8px;'><h4>🤖 About VedaNex AI Assistant</h4><p>I'm <strong>VedaNex</strong>, your intelligent Ayurvedic health companion! I combine ancient Ayurvedic wisdom with modern AI to help you:</p><ul><li>🌿 Get personalized health advice</li><li>💊 Compare traditional and modern treatments</li><li>🧘 Learn about holistic wellness</li><li>📚 Understand Ayurvedic principles</li><li>❓ Answer general health questions</li></ul><p>Ask me anything about health, wellness, or life in general!</p></div>`
            },
            {
              pattern: /(?:weather|temperature outside|climate|forecast)/,
              response: () => `<div style='background: #fff3e0; padding: 15px; border-radius: 8px;'><h4>🌤️ Weather Information</h4><p>I don't have access to real-time weather data, but I can suggest:</p><ul><li>Check your local weather app or website</li><li>🌿 <strong>Ayurvedic Tip:</strong> Adjust your routine based on seasons (Ritucharya)</li><li>☀️ Summer: Stay cool with coconut water, cucumber</li><li>❄️ Winter: Warm foods, ginger tea, self-massage with warm oils</li><li>🌧️ Monsoon: Light, warm foods, avoid heavy meals</li></ul></div>`
            },
            {
              pattern: /(?:joke|funny|humor|make me laugh|tell me something funny)/,
              response: () => {
                const jokes = [
                  "Why don't herbs ever get stressed? Because they know how to stay grounded! 🌿😄",
                  "What did the Ayurvedic doctor say to the impatient patient? 'Good health takes thyme!' 🌿⏰",
                  "Why did the yoga instructor go to the bank? To get better balance! 🧘💰",
                  "What's an Ayurvedic practitioner's favorite type of music? Herb and blues! 🎵🌿",
                  "Why don't doshas ever argue? Because they believe in natural harmony! ☯️😊"
                ];
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                return `<div style='background: #fce4ec; padding: 15px; border-radius: 8px;'><h4>😄 Here's a healthy dose of humor!</h4><p><strong>${randomJoke}</strong></p><p><em>Laughter is the best medicine after all! 😂</em></p></div>`;
              }
            },
            {
              pattern: /(?:how are you|how do you feel|are you okay|your health)/,
              response: () => `<div style='background: #e1f5fe; padding: 15px; border-radius: 8px;'><h4>😊 I'm doing great, thank you!</h4><p>As an AI, I don't have physical health, but I'm running smoothly and ready to help! My 'doshas' are perfectly balanced in the digital realm! 🤖⚖️</p><p>How are <strong>you</strong> feeling today? I'd love to help with any health concerns or questions you might have!</p></div>`
            },
            {
              pattern: /(?:food|diet|nutrition|what to eat|healthy food|meal|recipe|cooking)/,
              response: () => `<div style='background: linear-gradient(135deg, #e8f5e8, #f1f8e9); padding: 20px; border-radius: 12px;'><h3>🍎 Ayurvedic Nutrition Wisdom</h3><div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0;'><div style='background: var(--techwave-some-r-bg-color); padding: 15px; border-radius: 8px;'><h4>🔥 For Vata (Dry, Cold)</h4><p><strong>Favor:</strong> Warm, moist, grounding foods</p><p><strong>Foods:</strong> Rice, ghee, nuts, dates</p></div><div style='background: var(--techwave-some-r-bg-color); padding: 15px; border-radius: 8px;'><h4>🌊 For Pitta (Hot, Sharp)</h4><p><strong>Favor:</strong> Cool, sweet, bitter foods</p><p><strong>Foods:</strong> Coconut, cucumber, leafy greens</p></div><div style='background: var(--techwave-some-r-bg-color); padding: 15px; border-radius: 8px;'><h4>🌍 For Kapha (Heavy, Slow)</h4><p><strong>Favor:</strong> Light, spicy, bitter foods</p><p><strong>Foods:</strong> Quinoa, ginger, turmeric</p></div></div><p>💡 <em>Not sure of your dosha? Ask me for a personalized assessment!</em></p></div>`
            },
            {
              pattern: /(?:exercise|workout|fitness|physical activity|gym|running|walking)/,
              response: () => `<div style='background: linear-gradient(135deg, #fce4ec, #f8bbd9); padding: 20px; border-radius: 12px;'><h3>🏃‍♂️ Ayurvedic Exercise Guidelines</h3><div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0;'><div style='background: var(--techwave-some-r-bg-color); padding: 15px; border-radius: 8px;'><h4>🧘 Yoga & Pranayama</h4><ul><li>Sun Salutations (Surya Namaskara)</li><li>Deep breathing (Pranayama)</li><li>Gentle stretching</li><li>Balance poses</li></ul></div><div style='background: var(--techwave-some-r-bg-color); padding: 15px; border-radius: 8px;'><h4>💪 Physical Activity</h4><ul><li>Morning walks in nature</li><li>Swimming</li><li>Light weight training</li><li>Dancing</li></ul></div></div><p><strong>⏰ Best Time:</strong> Early morning (6-10 AM) when Kapha dosha is dominant</p><p><strong>🎯 Intensity:</strong> Exercise to 50% capacity - you should be able to breathe through your nose</p></div>`
            },
            {
              pattern: /(?:mental health|stress|anxiety|depression|mood|emotional|psychology|stressed|anxious|worried|tension|panic|overwhelmed|burnout|stress symptoms|feeling stressed|under stress|work stress|life stress|chronic stress|acute stress|stress relief|stress management)/,
              response: () => generateStressManagementResponse()
            },
            {
              pattern: /(?:recommend products|suggest products|buy products|amazon products|supplements|ayurvedic products|where to buy|purchase|shopping|buy|online store|order products|product recommendations)/,
              response: (input) => {
                let productHtml = '';
                if (window.getAmazonProductRecommendations) {
                  productHtml = window.getAmazonProductRecommendations(input, '');
                }
                if (!productHtml) {
                  productHtml = `<div style='background: #e8f5e8; padding: 15px; border-radius: 8px;'>
                    <h4>🛒 Product Recommendations</h4>
                    <p>I can recommend high-quality Ayurvedic products based on your specific health needs!</p>
                    <p><strong>Just tell me:</strong></p>
                    <ul>
                      <li>What health condition you want to address</li>
                      <li>What type of product you're looking for (herbs, oils, supplements)</li>
                      <li>Your specific symptoms or concerns</li>
                    </ul>
                    <p>For example: "I need something for joint pain" or "recommend supplements for immunity"</p>
                  </div>`;
                }
                return productHtml;
              }
            },
            {
              pattern: /(?:turmeric|curcumin|inflammation|joint pain|arthritis)/,
              response: (input) => {
                const productHtml = window.getAmazonProductRecommendations ? window.getAmazonProductRecommendations(input, 'joint pain') : '';
                return `<div style='background: #fff3e0; padding: 15px; border-radius: 8px;'>
                  <h4>🌿 Turmeric & Joint Health</h4>
                  <p>Turmeric (Haldi) is one of Ayurveda's most powerful anti-inflammatory herbs. It contains curcumin, which helps reduce inflammation and joint pain naturally.</p>
                  <p><strong>Benefits:</strong></p>
                  <ul>
                    <li>Natural anti-inflammatory properties</li>
                    <li>Supports joint health and mobility</li>
                    <li>Boosts immunity</li>
                    <li>Aids digestion</li>
                  </ul>
                </div>${productHtml}`;
              }
            },
            {
              pattern: /(?:ashwagandha|stress relief|adaptogen|energy|vitality|stamina)/,
              response: (input) => {
                const productHtml = window.getAmazonProductRecommendations ? window.getAmazonProductRecommendations(input, 'stress') : '';
                return `<div style='background: #e8f5e8; padding: 15px; border-radius: 8px;'>
                  <h4>🌱 Ashwagandha - The Stress Buster</h4>
                  <p>Ashwagandha is known as the "King of Adaptogens" in Ayurveda. It helps your body adapt to stress and supports energy levels naturally.</p>
                  <p><strong>Benefits:</strong></p>
                  <ul>
                    <li>Reduces stress and anxiety</li>
                    <li>Boosts energy and vitality</li>
                    <li>Improves sleep quality</li>
                    <li>Supports hormonal balance</li>
                  </ul>
                </div>${productHtml}`;
              }
            },
            {
              pattern: /(?:anxiety symptoms|panic attack|social anxiety|general anxiety|anxiety disorder|feeling anxious|nervousness|restless|worried about)/,
              response: () => generateAnxietyResponse()
            },
            {
              pattern: /(?:depression symptoms|feeling depressed|sadness|hopeless|low mood|mood swings|emotional problems|mental fatigue)/,
              response: () => generateDepressionResponse()
            }
          ];
          
          // Check general patterns first
          for (let pattern of generalPatterns) {
            if (pattern.pattern.test(normalizedInput)) {
              return { type: 'general', response: pattern.response() };
            }
          }
          
          // 2. MEDICAL PATTERNS (existing medical logic)
          const medicalPatterns = [
            // Pain descriptions with body parts
            {
              pattern: /(?:i have|having|experiencing|suffering from|feel|feeling|my|got|getting)?\s*(?:severe|chronic|mild|sharp|dull|constant|persistent|intense|aching|throbbing|burning|stabbing)?\s*(back|spine|lower back|upper back|lumbar|cervical|neck|shoulder|knee|hip|joint|joints|finger|toe|head|chest|stomach|abdominal|heart|kidney|liver|eye|tooth|dental|ear|throat|nasal|sinus)\s*(?:pain|ache|aching|hurt|hurting|hurts|problem|problems|issue|issues|discomfort|soreness|stiffness|swelling|inflammation)/,
              extraction: (match) => {
                const bodyPart = match[1];
                const painMappings = {
                  'back': 'Back Pain', 'spine': 'Back Pain', 'lower back': 'Back Pain', 'upper back': 'Back Pain', 'lumbar': 'Back Pain', 'cervical': 'Back Pain',
                  'neck': 'Back Pain', 'shoulder': 'Arthritis', 'knee': 'Arthritis', 'hip': 'Arthritis', 'joint': 'Arthritis', 'joints': 'Arthritis', 'finger': 'Arthritis', 'toe': 'Gout',
                  'head': 'Migraine', 'chest': 'Hypertrophic Cardiomyopathy', 'stomach': 'Gastritis', 'abdominal': 'Irritable Bowel Syndrome', 'heart': 'Hypertrophic Cardiomyopathy',
                  'kidney': 'Kidney Stones', 'liver': 'Liver Cirrhosis', 'eye': 'Cataracts', 'tooth': 'Dental Problems', 'dental': 'Dental Problems', 'ear': 'Tinnitus',
                  'throat': 'Common Cold', 'nasal': 'Common Cold', 'sinus': 'Common Cold'
                };
                return painMappings[bodyPart] || null;
              }
            },
            
            // Medical conditions with symptoms
            {
              pattern: /(?:i have|having|experiencing|suffering from|diagnosed with|got|getting)?\s*(?:high|low|elevated|increased|decreased|irregular|abnormal)?\s*(blood pressure|bp|sugar|glucose|cholesterol|temperature|fever|weight|breathing|vision|memory|sleep|appetite|energy|mood|concentration)/,
              extraction: (match) => {
                const condition = match[1];
                const conditionMappings = {
                  'blood pressure': 'Hypertension', 'bp': 'Hypertension', 'sugar': 'Diabetes', 'glucose': 'Diabetes',
                  'cholesterol': 'Hypertension', 'temperature': 'Dengue Fever', 'fever': 'Dengue Fever', 'weight': 'Obesity',
                  'breathing': 'Asthma', 'vision': 'Cataracts', 'memory': 'Alzheimer\'s Disease', 'sleep': 'Insomnia',
                  'appetite': 'Depression', 'energy': 'Chronic Fatigue Syndrome', 'mood': 'Depression', 'concentration': 'Alzheimer\'s Disease'
                };
                return conditionMappings[condition] || null;
              }
            },
            
            // Symptom descriptions - Enhanced with stress patterns
            {
              pattern: /(?:i am|i'm|feeling|been|having|experiencing|getting)?\s*(?:very|extremely|really|quite|somewhat|a bit|little|constantly|frequently)?\s*(tired|weak|dizzy|nauseous|bloated|constipated|anxious|depressed|stressed|forgetful|confused|breathless|wheezing|coughing|sneezing|itchy|sweating|trembling|shaking|vomiting|bleeding|overwhelmed|burned out|tense|restless|irritable|moody|hopeless|sad)/,
              extraction: (match) => {
                const symptom = match[1];
                const symptomMappings = {
                  'tired': 'Chronic Fatigue Syndrome', 'weak': 'Anemia', 'dizzy': 'Hypertension', 'nauseous': 'Gastritis', 'bloated': 'Irritable Bowel Syndrome',
                  'constipated': 'Constipation', 'anxious': 'Anxiety Disorders', 'depressed': 'Depression', 'stressed': 'Anxiety Disorders',
                  'forgetful': 'Alzheimer\'s Disease', 'confused': 'Alzheimer\'s Disease', 'breathless': 'Asthma', 'wheezing': 'Asthma',
                  'coughing': 'Common Cold', 'sneezing': 'Common Cold', 'itchy': 'Eczema', 'sweating': 'Hyperthyroidism',
                  'trembling': 'Parkinson\'s Disease', 'shaking': 'Parkinson\'s Disease', 'vomiting': 'Gastritis', 'bleeding': 'Hemorrhoids',
                  'overwhelmed': 'Anxiety Disorders', 'burned out': 'Chronic Fatigue Syndrome', 'tense': 'Anxiety Disorders', 
                  'restless': 'Anxiety Disorders', 'irritable': 'Anxiety Disorders', 'moody': 'Depression', 'hopeless': 'Depression', 'sad': 'Depression'
                };
                return symptomMappings[symptom] || null;
              }
            },
            
            // Disease mentions in context
            {
              pattern: /(?:about|regarding|concerning|related to|information on|help with|treatment for|cure for|medicine for|suffering from|diagnosed with|have|got)\s+(diabetes|hypertension|arthritis|asthma|migraine|depression|anxiety|insomnia|obesity|acne|eczema|psoriasis|cancer|stroke|alzheimer|parkinson|osteoporosis|anemia|thyroid|pcos|kidney stone|liver|constipation|gastritis|gerd|ibs|gout|copd|multiple sclerosis|fibromyalgia|cataracts|glaucoma|tinnitus|vertigo|epilepsy|pneumonia|bronchitis|sinusitis|uti|hemorrhoids|gallstones|hernia|varicose veins|cellulitis|shingles|bell's palsy|carpal tunnel|plantar fasciitis|tennis elbow|frozen shoulder|disc herniation|spinal stenosis|scoliosis|kyphosis|lordosis)/,
              extraction: (match) => {
                const disease = match[1];
                const diseaseMappings = {
                  'diabetes': 'Diabetes', 'hypertension': 'Hypertension', 'arthritis': 'Arthritis', 'asthma': 'Asthma', 'migraine': 'Migraine',
                  'depression': 'Depression', 'anxiety': 'Anxiety Disorders', 'insomnia': 'Insomnia', 'obesity': 'Obesity', 'acne': 'Acne',
                  'eczema': 'Eczema', 'psoriasis': 'Psoriasis', 'cancer': 'Cancer', 'stroke': 'Stroke', 'alzheimer': 'Alzheimer\'s Disease',
                  'parkinson': 'Parkinson\'s Disease', 'osteoporosis': 'Osteoporosis', 'anemia': 'Anemia', 'thyroid': 'Hypothyroidism',
                  'pcos': 'Menstrual Disorders', 'kidney stone': 'Kidney Stones', 'liver': 'Liver Cirrhosis', 'constipation': 'Constipation',
                  'gastritis': 'Gastritis', 'gerd': 'GERD', 'ibs': 'Irritable Bowel Syndrome', 'gout': 'Gout', 'copd': 'COPD',
                  'multiple sclerosis': 'Multiple Sclerosis', 'fibromyalgia': 'Fibromyalgia', 'cataracts': 'Cataracts', 'glaucoma': 'Glaucoma',
                  'tinnitus': 'Tinnitus', 'vertigo': 'Vertigo', 'epilepsy': 'Epilepsy', 'pneumonia': 'Pneumonia', 'bronchitis': 'Bronchitis',
                  'sinusitis': 'Common Cold', 'uti': 'Urinary Tract Infection', 'hemorrhoids': 'Hemorrhoids', 'gallstones': 'Gallstones',
                  'hernia': 'Hernia', 'varicose veins': 'Varicose Veins', 'cellulitis': 'Cellulitis', 'shingles': 'Shingles',
                  'bell\'s palsy': 'Bell\'s Palsy', 'carpal tunnel': 'Carpal Tunnel Syndrome', 'plantar fasciitis': 'Plantar Fasciitis',
                  'tennis elbow': 'Tennis Elbow', 'frozen shoulder': 'Frozen Shoulder', 'disc herniation': 'Back Pain',
                  'spinal stenosis': 'Back Pain', 'scoliosis': 'Back Pain', 'kyphosis': 'Back Pain', 'lordosis': 'Back Pain'
                };
                return diseaseMappings[disease] || null;
              }
            },
            
            // Casual conversational patterns
            {
              pattern: /(?:my|i'm having|there's|got|getting|feeling)\s+(?:a|some|this|really bad|terrible|awful)?\s*(headache|backache|stomachache|toothache|earache|sore throat|runny nose|stuffy nose|dry cough|wet cough|chest pain|joint pain|muscle pain|neck pain|leg pain|arm pain|eye pain|burning sensation|itching|rash|swelling|inflammation|stiffness|weakness|fatigue|dizziness|nausea|vomiting|diarrhea|constipation|heartburn|acid reflux|shortness of breath|palpitations|irregular heartbeat|high fever|chills|sweats|tremors|seizures|memory problems|mood swings|panic attacks|anxiety attacks|insomnia|sleep problems)/,
              extraction: (match) => {
                const symptom = match[1];
                const casualMappings = {
                  'headache': 'Migraine', 'backache': 'Back Pain', 'stomachache': 'Gastritis', 'toothache': 'Dental Problems',
                  'earache': 'Tinnitus', 'sore throat': 'Common Cold', 'runny nose': 'Common Cold', 'stuffy nose': 'Common Cold',
                  'dry cough': 'Common Cold', 'wet cough': 'Common Cold', 'chest pain': 'Hypertrophic Cardiomyopathy',
                  'joint pain': 'Arthritis', 'muscle pain': 'Fibromyalgia', 'neck pain': 'Back Pain', 'leg pain': 'Varicose Veins',
                  'arm pain': 'Arthritis', 'eye pain': 'Cataracts', 'burning sensation': 'GERD', 'itching': 'Eczema',
                  'rash': 'Eczema', 'swelling': 'Arthritis', 'inflammation': 'Arthritis', 'stiffness': 'Arthritis',
                  'weakness': 'Anemia', 'fatigue': 'Chronic Fatigue Syndrome', 'dizziness': 'Hypertension', 'nausea': 'Gastritis',
                  'vomiting': 'Gastritis', 'diarrhea': 'Irritable Bowel Syndrome', 'constipation': 'Constipation',
                  'heartburn': 'GERD', 'acid reflux': 'GERD', 'shortness of breath': 'Asthma', 'palpitations': 'Hypertrophic Cardiomyopathy',
                  'irregular heartbeat': 'Hypertrophic Cardiomyopathy', 'high fever': 'Dengue Fever', 'chills': 'Dengue Fever',
                  'sweats': 'Hyperthyroidism', 'tremors': 'Parkinson\'s Disease', 'seizures': 'Epilepsy',
                  'memory problems': 'Alzheimer\'s Disease', 'mood swings': 'Depression', 'panic attacks': 'Anxiety Disorders',
                  'anxiety attacks': 'Anxiety Disorders', 'insomnia': 'Insomnia', 'sleep problems': 'Insomnia'
                };
                return casualMappings[symptom] || null;
              }
            },
            
            // Stress-specific symptom patterns
            {
              pattern: /(?:stress symptoms|showing signs of stress|stress related|due to stress|stress causing|stress induced)?\s*(headache|headaches|muscle tension|sleep problems|digestive issues|fatigue|irritability|anxiety|depression|memory problems|concentration issues|mood changes)/,
              extraction: (match) => {
                return 'Anxiety Disorders'; // Route all stress symptoms to anxiety/stress management
              }
            },
            
            // Comprehensive stress expressions
            {
              pattern: /(?:can't handle|too much pressure|work is stressing|life is overwhelming|feeling burned out|under a lot of stress|stress is killing me|so much tension|can't cope|breaking point|mental exhaustion|emotional drain|need stress relief|help with stress)/,
              extraction: (match) => {
                return 'Anxiety Disorders';
              }
            }
          ];
          
          // Analyze input against patterns
          for (let pattern of medicalPatterns) {
            const match = normalizedInput.match(pattern.pattern);
            if (match) {
              const result = pattern.extraction(match);
              if (result) {
                return csvDiseaseDB.find(d => d.name === result);
              }
            }
          }
          
          return null;
        }

        // Helper functions for comprehensive responses
        function generateAyurvedaKnowledgeResponse() {
          return `<div style='background: linear-gradient(135deg, #e8f5e8, #f0f8f0); padding: 20px; border-radius: 12px; margin: 10px 0;'>
            <h3>🌿 Ayurveda - The Science of Life</h3>
            <p><strong>Ayurveda</strong> is a 5000-year-old holistic healing system from India that focuses on:</p>
            <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 15px 0;'>
              <div style='background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
                <h4>🔥 Three Doshas</h4>
                <ul>
                  <li><strong>Vata</strong>: Air & Space (Movement)</li>
                  <li><strong>Pitta</strong>: Fire & Water (Metabolism)</li>
                  <li><strong>Kapha</strong>: Earth & Water (Structure)</li>
                </ul>
              </div>
              <div style='background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
                <h4>🌱 Core Principles</h4>
                <ul>
                  <li>Prevention over cure</li>
                  <li>Natural healing</li>
                  <li>Mind-body balance</li>
                  <li>Personalized treatment</li>
                </ul>
              </div>
            </div>
            <p>💡 <em>Would you like to know about a specific aspect of Ayurveda or take a dosha quiz?</em></p>
          </div>`;
        }

        function generateHealthTipsResponse() {
          return `<div style='background: linear-gradient(135deg, #e3f2fd, #f0f7ff); padding: 20px; border-radius: 12px;'>
            <h3>💪 Holistic Health Tips</h3>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0;'>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🍽️ Nutrition</h4>
                <ul>
                  <li>Eat fresh, seasonal foods</li>
                  <li>Include all 6 tastes daily</li>
                  <li>Drink warm water</li>
                  <li>Eat mindfully</li>
                </ul>
              </div>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🧘 Lifestyle</h4>
                <ul>
                  <li>Sleep by 10 PM</li>
                  <li>Wake before sunrise</li>
                  <li>Daily meditation</li>
                  <li>Regular exercise</li>
                </ul>
              </div>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🌿 Natural Remedies</h4>
                <ul>
                  <li>Turmeric for inflammation</li>
                  <li>Ginger for digestion</li>
                  <li>Ashwagandha for stress</li>
                  <li>Triphala for detox</li>
                </ul>
              </div>
            </div>
          </div>`;
        }

        function generateGreetingResponse() {
          const greetings = [
            "🙏 Namaste! Welcome to VedaNex - your Ayurvedic health companion!",
            "🌅 Hello there! Ready to explore the path to holistic wellness?",
            "🌿 Greetings! I'm here to guide you on your health journey!",
            "☀️ Welcome! Let's discover natural ways to enhance your well-being!"
          ];
          const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
          return `<div style='background: linear-gradient(135deg, #fff3e0, #ffeaa7); padding: 20px; border-radius: 12px;'>
            <h3>${randomGreeting}</h3>
            <p>I can help you with:</p>
            <div style='display: flex; flex-wrap: wrap; gap: 10px; margin: 15px 0;'>
              <span style='background: var(--techwave-main-color); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px;'>🏥 Health Conditions</span>
              <span style='background: var(--techwave-main-color); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px;'>🌿 Ayurvedic Remedies</span>
              <span style='background: var(--techwave-main-color); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px;'>💊 Medicine Comparisons</span>
              <span style='background: var(--techwave-main-color); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px;'>🧘 Wellness Tips</span>
              <span style='background: var(--techwave-main-color); color: white; padding: 8px 12px; border-radius: 20px; font-size: 14px;'>❓ General Questions</span>
            </div>
            <p>What would you like to know today?</p>
          </div>`;
        }

        function generateNutritionResponse() {
          return `<div style='background: linear-gradient(135deg, #e8f5e8, #f1f8e9); padding: 20px; border-radius: 12px;'>
            <h3>🍎 Ayurvedic Nutrition Wisdom</h3>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 15px 0;'>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🔥 For Vata (Dry, Cold)</h4>
                <p><strong>Favor:</strong> Warm, moist, grounding foods</p>
                <p><strong>Foods:</strong> Rice, ghee, nuts, dates</p>
              </div>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🌊 For Pitta (Hot, Sharp)</h4>
                <p><strong>Favor:</strong> Cool, sweet, bitter foods</p>
                <p><strong>Foods:</strong> Coconut, cucumber, leafy greens</p>
              </div>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🌍 For Kapha (Heavy, Slow)</h4>
                <p><strong>Favor:</strong> Light, spicy, bitter foods</p>
                <p><strong>Foods:</strong> Quinoa, ginger, turmeric</p>
              </div>
            </div>
            <p>💡 <em>Not sure of your dosha? Ask me for a personalized assessment!</em></p>
          </div>`;
        }

        function generateExerciseResponse() {
          return `<div style='background: linear-gradient(135deg, #fce4ec, #f8bbd9); padding: 20px; border-radius: 12px;'>
            <h3>🏃‍♂️ Ayurvedic Exercise Guidelines</h3>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0;'>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🧘 Yoga & Pranayama</h4>
                <ul>
                  <li>Sun Salutations (Surya Namaskara)</li>
                  <li>Deep breathing (Pranayama)</li>
                  <li>Gentle stretching</li>
                  <li>Balance poses</li>
                </ul>
              </div>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>💪 Physical Activity</h4>
                <ul>
                  <li>Morning walks in nature</li>
                  <li>Swimming</li>
                  <li>Light weight training</li>
                  <li>Dancing</li>
                </ul>
              </div>
            </div>
            <p><strong>⏰ Best Time:</strong> Early morning (6-10 AM) when Kapha dosha is dominant</p>
            <p><strong>🎯 Intensity:</strong> Exercise to 50% capacity - you should be able to breathe through your nose</p>
          </div>`;
        }

        function generateMentalHealthResponse() {
          return `<div style='background: linear-gradient(135deg, #e1f5fe, #b3e5fc); padding: 20px; border-radius: 12px;'>
            <h3>🧠 Mental Wellness & Ayurveda</h3>
            <div style='display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin: 15px 0;'>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🧘 Mind Practices</h4>
                <ul>
                  <li>Daily meditation (Dhyana)</li>
                  <li>Breathing exercises</li>
                  <li>Mindful eating</li>
                  <li>Gratitude practice</li>
                </ul>
              </div>
              <div style='background: #fff; padding: 15px; border-radius: 8px;'>
                <h4>🌿 Natural Support</h4>
                <ul>
                  <li>Ashwagandha for stress</li>
                  <li>Brahmi for memory</li>
                  <li>Jatamansi for anxiety</li>
                  <li>Shankhpushpi for focus</li>
                </ul>
              </div>
            </div>
            <p><strong>⚠️ Important:</strong> For serious mental health concerns, please consult qualified healthcare professionals alongside Ayurvedic support.</p>
          </div>`;
        }

        function generateStressManagementResponse() {
          return `<div style='background: linear-gradient(135deg, #ffecb3, #fff3c4); padding: 20px; border-radius: 12px;'>
            <h3>😰 Stress Management - Ayurvedic Approach</h3>
            <div style='background: #fff8e1; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🔍 Common Stress Symptoms:</h4>
              <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 15px;'>
                <div>
                  <h5>Physical Signs:</h5>
                  <ul><li>Headaches & muscle tension</li><li>Fatigue & sleep problems</li><li>Digestive issues</li><li>Frequent illness</li></ul>
                </div>
                <div>
                  <h5>Emotional Signs:</h5>
                  <ul><li>Anxiety & irritability</li><li>Depression & mood swings</li><li>Feeling overwhelmed</li><li>Low motivation</li></ul>
                </div>
              </div>
            </div>
            <div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🌿 Ayurvedic Stress Relief:</h4>
              <ul>
                <li><strong>Ashwagandha:</strong> Adaptogenic herb for stress resilience</li>
                <li><strong>Brahmi:</strong> Calms the mind and improves focus</li>
                <li><strong>Jatamansi:</strong> Natural anxiety reliever</li>
                <li><strong>Saraswatarishta:</strong> Complete brain tonic</li>
              </ul>
            </div>
            <div style='background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🧘 Immediate Relief Techniques:</h4>
              <ul>
                <li><strong>Deep Breathing:</strong> 4-7-8 breathing technique</li>
                <li><strong>Progressive Relaxation:</strong> Tense and release muscle groups</li>
                <li><strong>Meditation:</strong> 10-15 minutes daily</li>
                <li><strong>Warm Oil Massage:</strong> Self-massage with sesame oil</li>
              </ul>
            </div>
            <p><strong>⚠️ Remember:</strong> Chronic stress needs professional attention. Consider counseling alongside Ayurvedic support.</p>
          </div>`;
        }

        function generateAnxietyResponse() {
          return `<div style='background: linear-gradient(135deg, #e1f5fe, #b2ebf2); padding: 20px; border-radius: 12px;'>
            <h3>😨 Anxiety Management - Natural Solutions</h3>
            <div style='background: #f0f4c3; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🔍 Anxiety Symptoms Recognition:</h4>
              <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 15px;'>
                <div>
                  <h5>Physical:</h5>
                  <ul><li>Racing heart</li><li>Sweating & trembling</li><li>Shortness of breath</li><li>Muscle tension</li></ul>
                </div>
                <div>
                  <h5>Mental:</h5>
                  <ul><li>Excessive worry</li><li>Racing thoughts</li><li>Difficulty concentrating</li><li>Fear of losing control</li></ul>
                </div>
              </div>
            </div>
            <div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🌿 Ayurvedic Anxiety Relief:</h4>
              <ul>
                <li><strong>Brahmi (Bacopa):</strong> Reduces anxiety and improves cognitive function</li>
                <li><strong>Shankhpushpi:</strong> Calms nervous system</li>
                <li><strong>Jatamansi:</strong> Natural anxiolytic properties</li>
                <li><strong>Tagara (Valerian):</strong> Promotes relaxation and sleep</li>
              </ul>
            </div>
            <div style='background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🆘 Quick Anxiety Relief:</h4>
              <ul>
                <li><strong>5-4-3-2-1 Technique:</strong> 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste</li>
                <li><strong>Pranayama:</strong> Alternate nostril breathing (Nadi Shodhana)</li>
                <li><strong>Cold Water:</strong> Splash on face or drink slowly</li>
                <li><strong>Grounding:</strong> Feel your feet on the ground</li>
              </ul>
            </div>
            <p><strong>🚨 Emergency:</strong> If experiencing panic attacks or severe anxiety, seek immediate medical attention.</p>
          </div>`;
        }

        function generateDepressionResponse() {
          return `<div style='background: linear-gradient(135deg, #f3e5f5, #e8eaf6); padding: 20px; border-radius: 12px;'>
            <h3>😢 Depression Support - Holistic Healing</h3>
            <div style='background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🔍 Depression Signs:</h4>
              <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 15px;'>
                <div>
                  <h5>Emotional:</h5>
                  <ul><li>Persistent sadness</li><li>Loss of interest</li><li>Feelings of worthlessness</li><li>Hopelessness</li></ul>
                </div>
                <div>
                  <h5>Physical:</h5>
                  <ul><li>Fatigue & low energy</li><li>Sleep disturbances</li><li>Appetite changes</li><li>Concentration problems</li></ul>
                </div>
              </div>
            </div>
            <div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🌿 Ayurvedic Mood Support:</h4>
              <ul>
                <li><strong>Brahmi:</strong> Enhances mood and cognitive function</li>
                <li><strong>Mandukaparni:</strong> Natural antidepressant properties</li>
                <li><strong>Saraswatarishta:</strong> Complete brain and mood tonic</li>
                <li><strong>St. John's Wort:</strong> Traditional mood elevator</li>
              </ul>
            </div>
            <div style='background: #e1f5fe; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>☀️ Daily Mood Boosters:</h4>
              <ul>
                <li><strong>Sunlight Exposure:</strong> 15-20 minutes daily morning sun</li>
                <li><strong>Yoga & Movement:</strong> Gentle exercise releases endorphins</li>
                <li><strong>Social Connection:</strong> Reach out to supportive friends/family</li>
                <li><strong>Gratitude Practice:</strong> Write 3 things you're grateful for daily</li>
              </ul>
            </div>
            <p><strong>🆘 Important:</strong> Depression is a serious condition. Please consult mental health professionals for proper diagnosis and treatment. Ayurveda works best as complementary support.</p>
          </div>`;
        }

        function findCSVDiseaseMatch(input) {
          const normalizedInput = input.toLowerCase();
          
          // First: Advanced Natural Language Processing
          const nlpResult = analyzeNaturalLanguage(input);
          if (nlpResult) {
            if (nlpResult.type === 'general') {
              return { type: 'general', response: nlpResult.response };
            }
            return nlpResult;
          }
          
          // Second: Direct disease name matches
          for (let disease of csvDiseaseDB) {
            if (normalizedInput.includes(disease.name.toLowerCase()) || 
                normalizedInput.includes(disease.name.toLowerCase().replace(' ', '')) ||
                normalizedInput.includes(disease.name.toLowerCase().replace(/[^a-z]/g, ''))) {
              return disease;
            }
          }
          
          // Third: Symptom-based matching from CSV database
          for (let disease of csvDiseaseDB) {
            const symptoms = disease.symptoms.toLowerCase().split(',');
            for (let symptom of symptoms) {
              symptom = symptom.trim();
              if (symptom.length > 3 && normalizedInput.includes(symptom)) {
                return disease;
              }
            }
          }
          
          return null;
        }

        // Medicine database for comparisons
        function getMedicineComparison(diseaseName) {
          const medicines = {
            'Diabetes': {
              ayurvedic: ['Karela (Bitter Gourd)', 'Methi (Fenugreek)', 'Jamun seeds', 'Gudmar (Gymnema)', 'Vijaysar', 'Chandraprabha Vati', 'Shilajit', 'Madhumehantak Churna'],
              modern: ['Metformin', 'Sulfonylureas (Glipizide)', 'DPP-4 inhibitors (Sitagliptin)', 'SGLT2 inhibitors', 'Insulin'],
              summary: 'Ayurvedic approach focuses on natural glucose regulation and digestive fire enhancement, while modern medicines directly target glucose metabolism pathways.'
            },
            'Hypertension': {
              ayurvedic: ['Arjuna bark', 'Brahmi', 'Jatamansi', 'Punarnava', 'Sarpagandha formulations', 'Arjunarishta'],
              modern: ['ACE inhibitors (Lisinopril)', 'ARBs (Losartan)', 'Calcium channel blockers (Amlodipine)', 'Beta-blockers (Metoprolol)', 'Diuretics'],
              summary: 'Ayurvedic herbs work on stress reduction and heart strengthening, while modern drugs directly block specific cardiovascular pathways.'
            },
            'Arthritis': {
              ayurvedic: ['Guggul', 'Shallaki (Boswellia)', 'Ashwagandha', 'Rasna', 'Nirgundi', 'Mahanarayan oil', 'Panchakarma therapies'],
              modern: ['NSAIDs (Ibuprofen)', 'Acetaminophen', 'COX-2 inhibitors', 'DMARDs (Methotrexate)', 'Biologics (TNF inhibitors)'],
              summary: 'Ayurvedic treatment focuses on detoxification and joint nourishment, while modern drugs target inflammation and immune responses.'
            },
            'Back Pain': {
              ayurvedic: ['Guggul', 'Rasna', 'Nirgundi', 'Dashmool', 'Ashwagandha', 'Mahanarayan oil', 'Ksheerabala oil', 'Panchakarma therapies'],
              modern: ['NSAIDs (Ibuprofen)', 'Muscle relaxants (Cyclobenzaprine)', 'Acetaminophen', 'Topical analgesics', 'Corticosteroid injections'],
              summary: 'Ayurvedic approach focuses on strengthening the spine, reducing inflammation naturally and improving mobility, while modern treatment targets pain relief and muscle relaxation.'
            },
            'Common Cold': {
              ayurvedic: ['Trikatu', 'Sitopaladi Churna', 'Vasaka', 'Tulsi', 'Licorice', 'Steam inhalation', 'Anu Taila'],
              modern: ['Decongestants (Pseudoephedrine)', 'Antihistamines (Loratadine)', 'Expectorants (Guaifenesin)', 'Cough suppressants'],
              summary: 'Ayurveda boosts immunity naturally and clears respiratory passages, while modern medicines provide symptomatic relief.'
            },
            'Migraine': {
              ayurvedic: ['Brahmi', 'Jatamansi', 'Shirodhara therapy', 'Saraswatarishta', 'Ashwagandha', 'Nasya therapy'],
              modern: ['Triptans (Sumatriptan)', 'NSAIDs', 'Beta-blockers (Propranolol)', 'Anticonvulsants (Topiramate)', 'Antidepressants'],
              summary: 'Ayurvedic approach addresses root causes through stress management and nervous system strengthening, while modern drugs target specific neurotransmitter pathways.'
            },
            'Asthma': {
              ayurvedic: ['Vasaka', 'Kantakari', 'Bharangi', 'Pushkarmool', 'Pranayama', 'Steam therapy'],
              modern: ['Beta-agonists (Salbutamol)', 'Inhaled corticosteroids (Budesonide)', 'Leukotriene modifiers (Montelukast)', 'Theophylline'],
              summary: 'Ayurveda focuses on respiratory strengthening and removing lung congestion, while modern inhalers provide rapid bronchodilation.'
            },
            'Gastritis': {
              ayurvedic: ['Amla', 'Licorice (Yashtimadhu)', 'Triphala', 'Kutaj', 'Guduchi', 'Digestive tonics'],
              modern: ['Proton pump inhibitors (Omeprazole)', 'H2 blockers', 'Antacids', 'Antibiotics (for H.pylori)'],
              summary: 'Ayurvedic herbs heal and strengthen digestive fire naturally, while modern drugs reduce acid production and neutralize existing acid.'
            },
            'Constipation': {
              ayurvedic: ['Triphala', 'Isabgol (Psyllium)', 'Castor oil', 'Abhyanga massage', 'Basti therapy'],
              modern: ['Bulk-forming laxatives (Psyllium)', 'Osmotic laxatives (PEG)', 'Stimulant laxatives (Senna)', 'Stool softeners'],
              summary: 'Ayurveda improves digestive function and promotes natural elimination, while modern laxatives provide mechanical or osmotic assistance.'
            },
            'Insomnia': {
              ayurvedic: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Shankhpushpi', 'Warm milk with nutmeg', 'Oil massage'],
              modern: ['Zolpidem', 'Melatonin', 'Sedating antidepressants', 'Benzodiazepines (short-term)', 'Antihistamines'],
              summary: 'Ayurvedic herbs calm the nervous system naturally without dependency, while modern sleep aids work on specific brain receptors.'
            },
            'Obesity': {
              ayurvedic: ['Guggul', 'Triphala', 'Vrikshamla (Garcinia)', 'Trikatu', 'Panchakarma detox'],
              modern: ['Orlistat', 'GLP-1 agonists (Semaglutide)', 'Phentermine', 'Topiramate combinations'],
              summary: 'Ayurveda improves metabolism and removes toxins holistically, while modern drugs target specific appetite or absorption pathways.'
            },
            'Depression': {
              ayurvedic: ['Brahmi', 'Ashwagandha', 'Jatamansi', 'Shankhpushpi', 'Meditation', 'Panchakarma'],
              modern: ['SSRIs (Sertraline)', 'SNRIs (Duloxetine)', 'Atypical antidepressants', 'Anxiolytics', 'Mood stabilizers'],
              summary: 'Ayurvedic approach balances mind-body constitution and promotes natural wellbeing, while modern antidepressants target neurotransmitter levels.'
            },
            'Hypothyroidism': {
              ayurvedic: ['Kanchanar Guggul', 'Punarnava', 'Brahmi', 'Ashwagandha', 'Dietary modifications'],
              modern: ['Levothyroxine', 'Liothyronine', 'Natural thyroid extracts', 'Combination T3/T4 preparations'],
              summary: 'Ayurveda supports thyroid function naturally through herbs and lifestyle, while modern treatment provides direct hormone replacement.'
            },
            'Kidney Stones': {
              ayurvedic: ['Gokshura', 'Punarnava', 'Varuna', 'Chandraprabha Vati', 'Patharchur (Stone breaker)'],
              modern: ['Alpha-blockers (Tamsulosin)', 'Pain medications', 'Thiazide diuretics', 'Potassium citrate', 'Lithotripsy'],
              summary: 'Ayurvedic herbs naturally dissolve stones and prevent formation, while modern treatment focuses on stone passage facilitation and mechanical removal.'
            },
            'Liver Cirrhosis': {
              ayurvedic: ['Bhumyamalaki', 'Kutki', 'Kalmegh', 'Arogyavardhini Vati', 'Liver detox therapies'],
              modern: ['Supportive care', 'Diuretics', 'Beta-blockers', 'Lactulose', 'Liver transplant (severe cases)'],
              summary: 'Ayurveda focuses on liver regeneration and detoxification, while modern medicine manages complications and provides supportive care.'
            },
            'Anemia': {
              ayurvedic: ['Lauha Bhasma', 'Punarnava', 'Draksha', 'Amalaki', 'Iron-rich dietary protocols'],
              modern: ['Oral iron supplements (Ferrous sulfate)', 'IV iron', 'B12 injections', 'Folic acid', 'EPO (severe cases)'],
              summary: 'Ayurvedic iron preparations are gentle on digestion with synergistic herbs, while modern supplements provide direct iron replacement.'
            },
            'Psoriasis': {
              ayurvedic: ['Neem', 'Manjistha', 'Khadira', 'Sariva', 'Blood purification therapies', 'Panchakarma'],
              modern: ['Topical corticosteroids', 'Vitamin D analogs', 'Methotrexate', 'Biologics (Secukinumab)', 'Light therapy'],
              summary: 'Ayurveda addresses root causes through blood purification and immune balance, while modern drugs suppress immune responses or cell proliferation.'
            },
            'Urinary Tract Infection': {
              ayurvedic: ['Punarnava', 'Gokshura', 'Coriander', 'Cranberry', 'Increased fluids', 'Hygiene protocols'],
              modern: ['Antibiotics (Nitrofurantoin)', 'Trimethoprim-sulfamethoxazole', 'Fosfomycin', 'Ciprofloxacin'],
              summary: 'Ayurvedic herbs provide natural antimicrobial action and urinary system support, while antibiotics directly kill bacteria.'
            },
            'Acne': {
              ayurvedic: ['Neem', 'Turmeric', 'Manjistha', 'Sariva', 'Triphala', 'Kumkumadi oil', 'Blood purification therapies'],
              modern: ['Topical retinoids (Tretinoin)', 'Benzoyl peroxide', 'Antibiotics (Clindamycin)', 'Hormonal therapy (for women)', 'Isotretinoin (severe cases)'],
              summary: 'Ayurveda addresses acne through blood purification and hormonal balance, while modern treatments target bacteria, reduce oil production, and accelerate skin cell turnover.'
            },
            'Dengue Fever': {
              ayurvedic: ['Tulsi', 'Giloy (Guduchi)', 'Neem', 'Papaya leaf extract', 'Amla', 'Immune boosting herbs'],
              modern: ['Paracetamol (fever management)', 'Oral rehydration solutions', 'Platelet transfusion (severe cases)', 'IV fluids', 'Supportive care'],
              summary: 'Ayurvedic approach focuses on boosting immunity and supporting platelet count naturally, while modern treatment provides symptomatic relief and prevents complications through supportive care.'
            },
            'Rheumatoid Arthritis': {
              ayurvedic: ['Guggul', 'Shallaki', 'Rasna', 'Nirgundi', 'Ashwagandha', 'Panchakarma detox', 'Specialized RA formulations'],
              modern: ['DMARDs (Methotrexate)', 'Biologics (TNF inhibitors)', 'JAK inhibitors', 'Corticosteroids', 'NSAIDs'],
              summary: 'Ayurveda focuses on immune system modulation and joint detoxification through natural means, while modern treatment uses targeted immune suppressants and anti-inflammatory drugs.'
            },
            'Gout': {
              ayurvedic: ['Giloy', 'Punarnava', 'Guggul', 'Triphala', 'Cherries', 'Anti-inflammatory herbs', 'Detox therapies'],
              modern: ['Allopurinol', 'Febuxostat', 'Colchicine', 'NSAIDs', 'Probenecid', 'Uricase therapy'],
              summary: 'Ayurvedic treatment emphasizes purine metabolism improvement and natural detoxification, while modern drugs directly block uric acid production or enhance elimination.'
            },
            'Anxiety Disorders': {
              ayurvedic: ['Brahmi', 'Shankhpushpi', 'Jatamansi', 'Ashwagandha', 'Meditation', 'Pranayama', 'Saraswatarishta'],
              modern: ['SSRIs (Sertraline)', 'Benzodiazepines (Lorazepam)', 'SNRIs', 'Buspirone', 'Beta-blockers (performance anxiety)'],
              summary: 'Ayurvedic herbs provide natural anxiolytic effects while strengthening the nervous system, whereas modern medications work on specific neurotransmitter pathways for rapid anxiety relief.'
            },
            'Hemorrhoids': {
              ayurvedic: ['Triphala', 'Arshoghni Vati', 'Kantak Kari', 'Neem oil', 'Castor oil', 'Sitz baths with herbs'],
              modern: ['Topical corticosteroids', 'Topical anesthetics', 'Vasoconstrictor creams', 'Rubber band ligation', 'Surgical removal'],
              summary: 'Ayurvedic approach focuses on improving digestion and reducing inflammation naturally, while modern treatment provides direct symptomatic relief and surgical interventions.'
            },
            'Menstrual Disorders': {
              ayurvedic: ['Ashoka', 'Shatavari', 'Lodhra', 'Dashamoola', 'Rajapravartini Vati', 'Hormone balancing herbs'],
              modern: ['Hormonal contraceptives', 'NSAIDs (pain)', 'Tranexamic acid (heavy bleeding)', 'GnRH agonists', 'Hormonal IUD'],
              summary: 'Ayurveda balances reproductive hormones naturally through herbs and lifestyle, while modern medicine uses synthetic hormones and targeted therapies for menstrual regulation.'
            },
            'Osteoporosis': {
              ayurvedic: ['Asthi Shrinkhala', 'Arjuna', 'Laksha', 'Calcium-rich herbs', 'Bone strengthening formulations', 'Panchakarma'],
              modern: ['Bisphosphonates (Alendronate)', 'Calcium supplements', 'Vitamin D', 'Denosumab', 'Hormone replacement therapy'],
              summary: 'Ayurvedic bone tonics work on improving bone metabolism and mineral absorption naturally, while modern drugs directly prevent bone breakdown or enhance formation.'
            },
            'Eczema': {
              ayurvedic: ['Neem', 'Turmeric', 'Manjistha', 'Khadira', 'Coconut oil', 'Blood purification', 'Anti-allergic herbs'],
              modern: ['Topical corticosteroids', 'Calcineurin inhibitors', 'Antihistamines', 'Moisturizers', 'Immunosuppressants (severe cases)'],
              summary: 'Ayurveda treats eczema by purifying blood and balancing immune responses, while modern treatment focuses on reducing inflammation and managing allergic reactions.'
            },
            'Stroke': {
              ayurvedic: ['Brahmi', 'Mandukaparni', 'Saraswatarishta', 'Medhya Rasayana', 'Panchakarma rehabilitation', 'Neuro-protective herbs'],
              modern: ['Antiplatelet therapy (Aspirin)', 'Anticoagulants', 'Statins', 'Blood pressure medications', 'Rehabilitation therapy'],
              summary: 'Ayurvedic approach focuses on neuroregeneration and brain nourishment through specialized herbs, while modern treatment prevents further strokes and manages risk factors.'
            },
            'Alzheimer\'s Disease': {
              ayurvedic: ['Brahmi', 'Mandukaparni', 'Shankhpushpi', 'Medhya Rasayana', 'Gold preparations', 'Memory enhancing herbs'],
              modern: ['Cholinesterase inhibitors (Donepezil)', 'NMDA antagonists (Memantine)', 'Antidepressants', 'Antipsychotics (behavioral symptoms)'],
              summary: 'Ayurvedic memory tonics aim to improve cognitive function and protect brain cells naturally, while modern drugs slow cognitive decline by affecting specific brain chemicals.'
            },
            'Cancer': {
              ayurvedic: ['Ashwagandha', 'Turmeric', 'Giloy', 'Rasayana herbs', 'Immune modulators', 'Supportive panchakarma'],
              modern: ['Chemotherapy agents', 'Targeted therapy', 'Immunotherapy', 'Radiation therapy', 'Hormone therapy'],
              summary: 'Ayurveda provides supportive care through immune enhancement and detoxification alongside conventional treatment, while modern oncology uses targeted anti-cancer drugs and radiation.'
            },
            'Parkinson\'s Disease': {
              ayurvedic: ['Mucuna Pruriens (Kapikacchu)', 'Brahmi', 'Ashwagandha', 'Rasayana therapy', 'Specialized neuro formulations'],
              modern: ['Levodopa/Carbidopa', 'Dopamine agonists', 'MAO-B inhibitors', 'COMT inhibitors', 'Deep brain stimulation'],
              summary: 'Ayurvedic herbs like Mucuna naturally contain L-DOPA and support nervous system health, while modern drugs replace dopamine or enhance its action in the brain.'
            },
            'Chronic Fatigue Syndrome': {
              ayurvedic: ['Ashwagandha', 'Shatavari', 'Brahmi', 'Rasayana herbs', 'Energy tonics', 'Panchakarma rejuvenation'],
              modern: ['Symptom management', 'Antidepressants', 'Sleep medications', 'Pain relievers', 'Graded exercise therapy'],
              summary: 'Ayurvedic rejuvenative herbs work on building energy reserves and cellular vitality, while modern treatment focuses on managing individual symptoms and gradual activity increase.'
            },
            'Irritable Bowel Syndrome': {
              ayurvedic: ['Bilva', 'Kutaj', 'Musta', 'Digestive herbs', 'Stress management herbs', 'Gut healing formulations'],
              modern: ['Antispasmodics', 'Loperamide (diarrhea)', 'Laxatives (constipation)', 'Antidepressants', 'Probiotics'],
              summary: 'Ayurveda addresses IBS through digestive fire improvement and stress management, while modern medicine targets specific symptoms with gut-specific medications.'
            },
            'Gallstones': {
              ayurvedic: ['Bhumi Amalaki', 'Kalmegh', 'Punarnava', 'Stone dissolving herbs', 'Liver cleansing formulations'],
              modern: ['Ursodeoxycholic acid', 'Pain medications', 'Antispasmodics', 'Laparoscopic cholecystectomy', 'Lithotripsy'],
              summary: 'Ayurvedic herbs aim to dissolve stones naturally and improve bile flow, while modern treatment uses bile acid therapy or surgical stone removal.'
            },
            'Chronic Bronchitis': {
              ayurvedic: ['Vasaka', 'Kantakari', 'Pushkarmool', 'Expectorant herbs', 'Lung tonics', 'Steam therapies'],
              modern: ['Bronchodilators', 'Mucolytics', 'Inhaled corticosteroids', 'Oxygen therapy', 'Pulmonary rehabilitation'],
              summary: 'Ayurvedic approach strengthens respiratory system and clears accumulated mucus naturally, while modern treatment opens airways and reduces inflammation.'
            },
            'Cataracts': {
              ayurvedic: ['Triphala eye wash', 'Mahatriphala Ghrita', 'Eye tonics', 'Netra Basti therapy', 'Vision improving herbs'],
              modern: ['Surgical removal', 'Intraocular lens implants', 'Eye drops (pre/post surgery)', 'Vision correction'],
              summary: 'Ayurvedic eye treatments aim to improve lens clarity and delay progression, while modern treatment primarily involves surgical lens replacement for vision restoration.'
            },
            'Osteoarthritis': {
              ayurvedic: ['Guggul', 'Shallaki', 'Rasna', 'Joint lubricating oils', 'Cartilage nourishing herbs', 'Gentle therapies'],
              modern: ['NSAIDs', 'Acetaminophen', 'Topical analgesics', 'Hyaluronic acid injections', 'Joint replacement surgery'],
              summary: 'Ayurvedic treatment focuses on cartilage nourishment and joint lubrication naturally, while modern medicine provides pain relief and surgical joint replacement when needed.'
            },
            'GERD': {
              ayurvedic: ['Amla', 'Licorice', 'Shatavari', 'Cooling herbs', 'Digestive tonics', 'Pitta pacifying diet'],
              modern: ['Proton pump inhibitors', 'H2 receptor blockers', 'Antacids', 'Prokinetic agents', 'Fundoplication surgery'],
              summary: 'Ayurveda cools digestive fire and heals esophageal lining naturally, while modern drugs reduce acid production and neutralize existing stomach acid.'
            },
            'Chronic Kidney Disease': {
              ayurvedic: ['Punarnava', 'Gokshura', 'Varuna', 'Kidney tonics', 'Nephroprotective herbs', 'Detox therapies'],
              modern: ['ACE inhibitors', 'ARBs', 'Diuretics', 'Phosphate binders', 'Dialysis', 'Kidney transplant'],
              summary: 'Ayurvedic kidney tonics aim to improve kidney function and slow progression, while modern treatment manages complications and provides renal replacement therapy.'
            },
            'Hypertrophic Cardiomyopathy': {
              ayurvedic: ['Arjuna', 'Pushkarmool', 'Heart tonics', 'Stress reducing herbs', 'Specialized cardiac formulations'],
              modern: ['Beta-blockers', 'Calcium channel blockers', 'Antiarrhythmic drugs', 'ICD implantation', 'Septal myectomy'],
              summary: 'Ayurvedic heart tonics strengthen cardiac muscle naturally and reduce stress, while modern treatment controls symptoms and prevents sudden cardiac death.'
            },
            'Multiple Sclerosis': {
              ayurvedic: ['Brahmi', 'Ashwagandha', 'Rasayana herbs', 'Neuro-protective formulations', 'Panchakarma support'],
              modern: ['Disease-modifying therapies', 'Interferons', 'Monoclonal antibodies', 'Corticosteroids', 'Symptom-specific medications'],
              summary: 'Ayurvedic neuro-tonics support nervous system health and reduce inflammation, while modern DMTs slow disease progression and manage specific MS symptoms.'
            },
            'COPD': {
              ayurvedic: ['Vasaka', 'Bharangi', 'Pushkarmool', 'Lung strengthening herbs', 'Breathing exercises', 'Respiratory support'],
              modern: ['Bronchodilators', 'Inhaled corticosteroids', 'Oxygen therapy', 'Pulmonary rehabilitation', 'Lung volume reduction'],
              summary: 'Ayurvedic respiratory tonics strengthen lung capacity and reduce inflammation naturally, while modern treatment opens airways and provides supplemental oxygen.'
            },
            'Gallbladder Cancer': {
              ayurvedic: ['Immune supporting herbs', 'Liver tonics', 'Rasayana therapy', 'Supportive care herbs', 'Detoxification'],
              modern: ['Surgical resection', 'Chemotherapy', 'Radiation therapy', 'Targeted therapy', 'Palliative care'],
              summary: 'Ayurveda provides supportive immune enhancement and liver protection alongside conventional treatment, while modern oncology uses surgery, chemotherapy, and radiation for cancer treatment.'
            },
            'Peptic Ulcer Disease': {
              ayurvedic: ['Licorice (Yashtimadhu)', 'Amla', 'Shatavari', 'Ulcer healing herbs', 'Digestive tonics', 'Stress reducing herbs'],
              modern: ['Proton pump inhibitors', 'H2 blockers', 'Antibiotics (H.pylori)', 'Cytoprotective agents', 'Antacids'],
              summary: 'Ayurvedic herbs heal ulcers naturally by protecting stomach lining and reducing acidity, while modern treatment eliminates H.pylori bacteria and reduces acid production.'
            },
            'Ovarian Cancer': {
              ayurvedic: ['Ashoka', 'Shatavari', 'Immune herbs', 'Female reproductive tonics', 'Supportive rasayana therapy'],
              modern: ['Surgical debulking', 'Chemotherapy', 'Targeted therapy', 'Hormonal therapy', 'Immunotherapy'],
              summary: 'Ayurvedic herbs support female reproductive health and immune function as complementary care, while modern treatment uses surgery and chemotherapy for cancer elimination.'
            },
            'Prostate Cancer': {
              ayurvedic: ['Saw palmetto', 'Gokshura', 'Ashwagandha', 'Male reproductive tonics', 'Immune supporting herbs'],
              modern: ['Radical prostatectomy', 'Radiation therapy', 'Hormone therapy', 'Chemotherapy', 'Immunotherapy'],
              summary: 'Ayurvedic prostate tonics support male reproductive health and immune function as complementary therapy, while modern treatment uses surgery, radiation, and hormone suppression for cancer control.'
            }
          };
          return medicines[diseaseName] || {
            ayurvedic: ['Consult qualified Ayurvedic practitioner for personalized herbal formulations', 'Constitutional assessment and dosha balancing', 'Panchakarma detoxification if appropriate'],
            modern: ['Consult physician for evidence-based medical treatment', 'Diagnostic tests and monitoring', 'Symptom-specific pharmaceutical interventions'],
            summary: 'Both systems offer valuable complementary approaches - Ayurveda focuses on natural healing, constitutional balance, and root cause treatment, while modern medicine provides targeted symptomatic relief, diagnostic precision, and emergency interventions. Integration of both approaches often yields optimal results.'
          };
        }

        // Generate formatted response from CSV data
        function generateCSVResponse(disease) {
          const medicineData = getMedicineComparison(disease.name);
          
          return `<div style='padding: 20px; border-left: 4px solid #4CAF50; background: #f9f9f9;'>
            <h3>🩺 ${disease.name} - Comprehensive Treatment Guide</h3>
            
            <div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🔍 Clinical Manifestation & Symptoms:</h4>
              <p><strong>📋 Primary Symptoms:</strong> ${disease.symptoms}</p>
              <p><strong>🎯 Ayurvedic Perspective:</strong> In Ayurveda, ${disease.name.toLowerCase()} is often understood as an imbalance of doshas (Vata, Pitta, Kapha) affecting the body's natural harmony. The symptoms manifest when toxins (ama) accumulate and disrupt normal physiological functions.</p>
            </div>
            
            <div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🌿 Comprehensive Ayurvedic Treatment Protocol:</h4>
              <p><strong>💊 Primary Treatment Approach:</strong> ${disease.treatment}</p>
              <p><strong>📝 Detailed Treatment Procedure:</strong> ${disease.procedure}</p>
              <p><strong>🔄 Treatment Philosophy:</strong> Ayurvedic treatment focuses on addressing the root cause (nidana) by balancing doshas, improving digestive fire (agni), and eliminating accumulated toxins through natural detoxification processes. The approach is holistic, considering physical, mental, and spiritual well-being.</p>
            </div>
            
            <div style='background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>💊 Comprehensive Medicine Comparison: Traditional vs Modern Approach</h4>
              <div style='display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 10px 0;'>
                <div style='background: #e8f5e8; padding: 12px; border-radius: 6px;'>
                  <h5>🌿 Ayurvedic Medicine Arsenal:</h5>
                  <ul style='margin: 5px 0; padding-left: 18px;'>
                    ${medicineData.ayurvedic.map(med => `<li style='margin: 3px 0; font-size: 14px;'><strong>${med}</strong></li>`).join('')}
                  </ul>
                  <p style='font-size: 12px; margin-top: 8px;'><em>Natural herbs work synergistically to restore balance</em></p>
                </div>
                <div style='background: #fff3cd; padding: 12px; border-radius: 6px;'>
                  <h5>💉 Modern Pharmaceutical Options:</h5>
                  <ul style='margin: 5px 0; padding-left: 18px;'>
                    ${medicineData.modern.map(med => `<li style='margin: 3px 0; font-size: 14px;'><strong>${med}</strong></li>`).join('')}
                  </ul>
                  <p style='font-size: 12px; margin-top: 8px;'><em>Targeted pharmaceutical interventions for symptom management</em></p>
                </div>
              </div>
              <div style='background: #f8f9fa; padding: 12px; border-radius: 6px; margin-top: 10px;'>
                <h5>📊 Comparative Treatment Philosophy & Mechanisms:</h5>
                <p style='margin: 5px 0; line-height: 1.6;'><strong>${medicineData.summary}</strong></p>
                <p style='font-size: 13px; margin-top: 8px;'><em>💡 Integration Insight: Combining both approaches can provide comprehensive care - Ayurveda for long-term healing and constitution building, modern medicine for acute symptom management and emergency situations.</em></p>
              </div>
            </div>
            
            <div style='background: #fce4ec; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>⚠️ Critical Safety Guidelines & Precautions:</h4>
              <p><strong>🛡️ Essential Safety Measures:</strong> ${disease.precautions}</p>
              <p><strong>🚨 Important Considerations:</strong> Always inform your healthcare provider about any Ayurvedic treatments you're taking, especially if you're on modern medications. Some herbs may interact with pharmaceutical drugs. Pregnant women, nursing mothers, and children should consult qualified practitioners before starting any treatment.</p>
            </div>
            
            <div style='background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>🎯 Holistic Lifestyle Enhancement Program:</h4>
              <ul style='line-height: 1.8;'>
                <li>🧘 <strong>Mind-Body Integration:</strong> Practice daily meditation, pranayama (breathing exercises), and stress management techniques. Mental health significantly impacts physical healing.</li>
                <li>🍽️ <strong>Therapeutic Nutrition:</strong> Follow personalized Ayurvedic dietary guidelines based on your constitution (prakriti) and current imbalance (vikriti). Eat fresh, seasonal, and locally sourced foods.</li>
                <li>💪 <strong>Movement Medicine:</strong> Engage in appropriate physical activities like yoga, walking, or swimming. Exercise should energize, not exhaust.</li>
                <li>🌿 <strong>Herbal Wisdom:</strong> Work with qualified Ayurvedic practitioners for personalized herbal formulations tailored to your specific condition and constitution.</li>
                <li>⏰ <strong>Circadian Harmony:</strong> Maintain regular sleep-wake cycles, ideally sleeping by 10 PM and waking before sunrise to align with natural rhythms.</li>
                <li>🌱 <strong>Environmental Wellness:</strong> Create a healing environment with proper ventilation, natural light, and minimal exposure to toxins.</li>
              </ul>
            </div>
            
            <div style='background: #fff3e0; padding: 15px; border-radius: 8px; margin: 10px 0;'>
              <h4>📚 Educational Resources & Next Steps:</h4>
              <ul>
                <li>🔍 <strong>Self-Assessment:</strong> Monitor your symptoms and response to treatments in a health journal</li>
                <li>👥 <strong>Professional Support:</strong> Build a healthcare team including both Ayurvedic and modern medicine practitioners</li>
                <li>📖 <strong>Continued Learning:</strong> Educate yourself about your condition from both traditional and modern perspectives</li>
                <li>🤝 <strong>Community Support:</strong> Connect with support groups and others managing similar conditions</li>
              </ul>
            </div>
            
            ${window.getAmazonProductRecommendations ? window.getAmazonProductRecommendations('', disease.name) : ''}
            
            <p style='font-style: italic; margin-top: 20px; border-top: 1px solid var(--techwave-border-color); padding-top: 15px;'>
              ⚠️ <em><strong>Medical Disclaimer:</strong> This comprehensive information is based on traditional Ayurvedic knowledge and is provided for educational purposes only. It should not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare practitioners for proper diagnosis and treatment. Individual results may vary, and what works for one person may not work for another due to constitutional differences.</em>
            </p>
          </div>`;
        }

        var n = {
          welcome: {
            type: "text",
            description: "welcome message",
            text: "<p>🙏 Namaste! Welcome to VedaNex! 🌿 I'm your AI Ayurvedic consultant with expertise in <strong>45+ health conditions</strong>. I understand natural language - just describe your problem!</p><div style='background: #f0f8ff; padding: 12px; border-radius: 6px; margin: 8px 0;'><h4>💬 Examples of how to talk to me:</h4><ul><li><strong>'I have diabetes'</strong> or <strong>'my blood sugar is high'</strong> 🩺</li><li><strong>'my back hurts'</strong> or <strong>'joint pain problem'</strong> 🦴</li><li><strong>'eye problems'</strong> or <strong>'vision is blurred'</strong> 👁️</li><li><strong>'tooth pain'</strong> or <strong>'my teeth hurt'</strong> 🦷</li><li><strong>'I feel stressed'</strong> or <strong>'having anxiety'</strong> 🧘</li><li><strong>'gas problem'</strong> or <strong>'stomach bloating'</strong> 💨</li><li><strong>'feeling weak'</strong> or <strong>'no energy'</strong> 💪</li><li><strong>'nausea'</strong> or <strong>'want to vomit'</strong> 🤢</li></ul></div><div style='background: #f0fff0; padding: 12px; border-radius: 6px; margin: 8px 0;'><h4>🎯 My Expertise Covers:</h4><p><strong>🔥 Common Issues:</strong> Diabetes, High BP, Arthritis, Cough, Cold, Fever, Headaches, Acidity</p><p><strong>👩 Women's Health:</strong> PCOS, Periods problems, Hormonal issues</p><p><strong>🫀 Chronic Care:</strong> Thyroid, Heart problems, Kidney stones, Liver health, Asthma</p><p><strong>✨ Beauty & Wellness:</strong> Skin problems, Hair loss, Weight management</p><p><strong>🧠 Mental Health:</strong> Stress, Anxiety, Depression, Sleep issues</p><p><strong>🩺 Advanced Conditions:</strong> Cancer support, Parkinson's, Alzheimer's, Multiple Sclerosis, COPD</p></div><p>🌟 <strong>Just type naturally!</strong> I'll give you detailed Ayurvedic treatment with causes, symptoms, remedies, diet plans & lifestyle tips - all formatted with helpful emojis! 🎯</p><p>⚡ Commands: /about, /welcome, /joke, /time, /clear</p>",
            append: !0,
          },
          about: {
            type: "text",
            description: "some information about VedaNex",
            text: "<p>VedaNex is your trusted companion for Ayurvedic health solutions. We provide personalized remedies based on ancient Ayurvedic wisdom combined with modern AI technology for 45+ health conditions.</p>",
            append: !0,
          },
          // Diabetes
          diabetes: {
            type: "text",
            description: "ayurvedic treatment for diabetes",
            text: "<div style='padding: 20px; border-left: 4px solid #4CAF50;'><h3>🩺 Diabetes - Complete Ayurvedic Treatment Guide</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes (Ayurvedic Perspective):</h4><ul><li>📍 <strong>Kapha Dosha Imbalance:</strong> Excessive accumulation of Kapha leading to insulin resistance</li><li>📍 <strong>Weak Digestive Fire (Agni):</strong> Poor metabolism and glucose processing</li><li>📍 <strong>Sedentary Lifestyle:</strong> Lack of physical activity disrupting natural metabolism</li><li>📍 <strong>Poor Dietary Habits:</strong> Excessive intake of sweet, oily, and processed foods</li><li>📍 <strong>Genetic Predisposition:</strong> Family history and constitutional factors</li><li>📍 <strong>Stress & Mental Tension:</strong> Affecting hormonal balance</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Comprehensive Ayurvedic Remedies:</h4><ul><li>🌱 <strong>Primary Herbs:</strong> Karela (Bitter Gourd), Methi (Fenugreek), Jamun seeds, Neem leaves, Gudmar, Vijaysar</li><li>🌱 <strong>Classical Formulations:</strong> Chandraprabha Vati, Shilajatu, Madhumehantak Churna</li><li>🌱 <strong>Daily Herbal Tea:</strong> Cinnamon, Fenugreek seeds, and Turmeric tea twice daily</li><li>🌱 <strong>Panchakarma Therapy:</strong> Specialized detoxification for diabetes management</li></ul></div><div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🍽️ Detailed Diabetic Diet Plan:</h4><ul><li>🥗 <strong>Include Daily:</strong> Bitter gourd, drumstick, fenugreek leaves, turmeric, amla, whole grains</li><li>🚫 <strong>Strictly Avoid:</strong> White sugar, refined flour, processed foods, sweet fruits like mango, grapes</li><li>⏰ <strong>Meal Timing:</strong> Regular meals at fixed times, avoid late night eating</li><li>💧 <strong>Hydration:</strong> Drink water stored in copper vessel, avoid cold drinks</li><li>🌾 <strong>Recommended Grains:</strong> Barley, quinoa, brown rice, oats</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Powerful Home Remedies:</h4><ul><li>🥤 <strong>Morning Ritual:</strong> Fresh karela juice with 1 tsp turmeric on empty stomach</li><li>🌰 <strong>Fenugreek Water:</strong> Soak 1 tbsp methi seeds overnight, drink water in morning</li><li>🍋 <strong>Amla Juice:</strong> 20ml fresh amla juice with honey before meals</li><li>🥒 <strong>Cucumber-Tomato Salad:</strong> Daily with black pepper and lemon</li><li>🌿 <strong>Neem Leaves:</strong> Chew 4-5 fresh neem leaves daily morning</li></ul></div><div style='background: #fce4ec; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🧘 Lifestyle & Prevention:</h4><ul><li>🏃 <strong>Exercise:</strong> 45 minutes daily - walking, yoga, pranayama</li><li>😴 <strong>Sleep Pattern:</strong> Sleep by 10 PM, wake up at 5 AM</li><li>🧘 <strong>Stress Management:</strong> Daily meditation, breathing exercises</li><li>📊 <strong>Regular Monitoring:</strong> Check blood sugar levels regularly</li><li>💪 <strong>Yoga Asanas:</strong> Bhujangasana, Dhanurasana, Paschimottanasana</li></ul></div><p style='color: #666; font-style: italic; margin-top: 20px;'>⚠️ <em>Note: This information is for educational purposes. Please consult with a qualified Ayurvedic practitioner for personalized treatment plans.</em></p></div>",
            append: !0,
          },
          // Hypertension
          hypertension: {
            type: "text", 
            description: "ayurvedic treatment for high blood pressure",
            text: "<div style='padding: 20px; border-left: 4px solid #FF6B6B;'><h3>❤️ Hypertension - Complete Ayurvedic Blood Pressure Management</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes (Ayurvedic Analysis):</h4><ul><li>🔥 <strong>Pitta Dosha Excess:</strong> Increased heat and fire element in body</li><li>😰 <strong>Chronic Stress:</strong> Mental tension affecting cardiovascular system</li><li>🧂 <strong>Excessive Salt Intake:</strong> Sodium retention causing fluid imbalance</li><li>😡 <strong>Anger & Irritability:</strong> Emotional factors raising blood pressure</li><li>🍷 <strong>Lifestyle Factors:</strong> Alcohol, smoking, sedentary habits</li><li>🧬 <strong>Genetic Predisposition:</strong> Family history of cardiovascular issues</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Comprehensive Herbal Treatment:</h4><ul><li>🌱 <strong>Primary Herbs:</strong> Arjuna bark, Brahmi, Shankhpushpi, Jatamansi, Punarnava</li><li>🌱 <strong>Classical Medicines:</strong> Sarpagandha Vati, Arjunarishta, Saraswatarishta</li><li>🌱 <strong>Heart Tonic:</strong> Arjuna bark powder with warm water twice daily</li><li>🌱 <strong>Nerve Calming:</strong> Brahmi and Mandukaparni for stress relief</li></ul></div><div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🍽️ Blood Pressure Friendly Diet:</h4><ul><li>✅ <strong>Include:</strong> Garlic, onion, celery, beetroot, pomegranate, watermelon</li><li>🚫 <strong>Avoid:</strong> Excess salt, spicy foods, fried items, caffeine, alcohol</li><li>🥗 <strong>Daily Salad:</strong> Cucumber, tomato, carrot with lemon dressing</li><li>🥥 <strong>Natural Diuretics:</strong> Coconut water, cucumber juice, bottle gourd</li><li>🐟 <strong>Protein Sources:</strong> Fish, lean chicken, legumes (in moderation)</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Effective Home Remedies:</h4><ul><li>🧄 <strong>Garlic Water:</strong> 2 cloves crushed in water, drink empty stomach</li><li>🥥 <strong>Coconut Water:</strong> 200ml twice daily, rich in potassium</li><li>🍉 <strong>Watermelon Seeds:</strong> Tea made from dried seeds, natural diuretic</li><li>🍋 <strong>Lemon-Honey Water:</strong> Warm water with lemon and honey morning</li><li>🥒 <strong>Cucumber Juice:</strong> Fresh juice with mint, cooling effect</li></ul></div><div style='background: #fce4ec; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🧘 Lifestyle & Stress Management:</h4><ul><li>🫁 <strong>Pranayama:</strong> Anulom Vilom, Bhramari, Sheetali for 15 minutes daily</li><li>🧘 <strong>Meditation:</strong> 20 minutes daily to reduce stress hormones</li><li>🚶 <strong>Gentle Exercise:</strong> Walking, swimming, avoid intense workouts</li><li>😴 <strong>Quality Sleep:</strong> 7-8 hours, sleep by 10 PM</li><li>😌 <strong>Anger Management:</strong> Practice patience, avoid heated arguments</li></ul></div><p style='color: #666; font-style: italic; margin-top: 20px;'>⚠️ <em>Warning: Monitor BP regularly. Consult doctor before stopping medications. Gradual lifestyle changes recommended.</em></p></div>",
            append: !0,
          },
          // Arthritis
          arthritis: {
            type: "text",
            description: "ayurvedic treatment for joint pain and arthritis", 
            text: "<div style='padding: 20px; border-left: 4px solid #FF9800;'><h3>🦴 Arthritis & Joint Pain - Complete Ayurvedic Treatment Guide</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes (Ayurvedic Analysis):</h4><ul><li>🌬️ <strong>Vata Dosha Imbalance:</strong> Excess air element causing joint dryness and stiffness</li><li>🌡️ <strong>Cold & Damp Weather:</strong> Environmental factors aggravating joint pain</li><li>📊 <strong>Age-Related Degeneration:</strong> Natural wear and tear of cartilage</li><li>🍽️ <strong>Poor Diet:</strong> Excess cold, dry, and processed foods</li><li>💻 <strong>Sedentary Lifestyle:</strong> Lack of movement causing joint stiffness</li><li>🧬 <strong>Toxin Accumulation (Ama):</strong> Undigested food particles in joints</li><li>🧠 <strong>Stress & Tension:</strong> Mental stress affecting physical joints</li><li>🏃 <strong>Past Injuries:</strong> Old trauma causing chronic inflammation</li></ul></div><div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>📋 Complete Symptom Analysis:</h4><ul><li>😫 <strong>Morning Stiffness:</strong> Joints feel rigid after waking up</li><li>😖 <strong>Pain Patterns:</strong> Aching, throbbing, or sharp pain in joints</li><li>🥲 <strong>Swelling:</strong> Inflammation around affected joints</li><li>🔥 <strong>Warmth & Redness:</strong> Heat sensation in inflamed areas</li><li>🚶 <strong>Reduced Mobility:</strong> Difficulty in movement and walking</li><li>🌧️ <strong>Weather Sensitivity:</strong> Pain increases during cold/rainy weather</li><li>😴 <strong>Fatigue:</strong> General tiredness due to chronic pain</li><li>🔊 <strong>Crackling Sounds:</strong> Crepitus or grinding sounds in joints</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Comprehensive Ayurvedic Treatment:</h4><ul><li>🌱 <strong>Primary Herbs:</strong> Guggul (anti-inflammatory), Shallaki (Boswellia), Ashwagandha (strength), Rasna (pain relief)</li><li>🌱 <strong>Secondary Herbs:</strong> Nirgundi, Eranda, Punarnava, Gokshura for joint support</li><li>📊 <strong>Classical Formulations:</strong> Yogaraja Guggul, Mahayogaraja Guggul, Simhanada Guggul</li><li>📊 <strong>Specialized Medicines:</strong> Dashmoolarishta, Balarishta, Sahacharadi packages</li><li>🔥 <strong>External Applications:</strong> Mahanarayan oil, Ksheerabala oil, Sahacharadi oil</li><li>🛁 <strong>Panchakarma Therapies:</strong> Abhyanga (oil massage), Swedana (steam), Basti (medicated enemas)</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Powerful Home Remedies:</h4><ul><li>🧄 <strong>Golden Milk:</strong> Turmeric + black pepper + warm milk before bed (anti-inflammatory)</li><li>🧄 <strong>Ginger Treatment:</strong> Fresh ginger tea 3x daily or ginger paste on joints</li><li>🥒 <strong>Garlic Remedy:</strong> 2-3 raw garlic cloves daily or garlic oil massage</li><li>🌶️ <strong>Cayenne Paste:</strong> Mix with coconut oil, apply externally for pain relief</li><li>🍋 <strong>Lemon-Honey:</strong> Warm water with lemon and honey to reduce inflammation</li><li>🥥 <strong>Coconut Oil Massage:</strong> Warm coconut oil with camphor for daily massage</li><li>🛁 <strong>Epsom Salt Bath:</strong> Warm bath with Epsom salt for 20 minutes</li><li>🌿 <strong>Fenugreek Seeds:</strong> Soak overnight, eat morning for joint lubrication</li></ul></div><div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🍽️ Detailed Diet Plan:</h4><ul><li>✅ <strong>Include Daily:</strong> Ginger, turmeric, garlic, green leafy vegetables, omega-3 rich foods</li><li>✅ <strong>Beneficial Foods:</strong> Cherries, pineapple, papaya, walnuts, flaxseeds, salmon</li><li>❌ <strong>Avoid Completely:</strong> Cold drinks, ice cream, excessive dairy, refined sugar, processed foods</li><li>❌ <strong>Limit:</strong> Tomatoes, potatoes, eggplant, bell peppers (nightshades may increase inflammation)</li><li>🍵 <strong>Healing Drinks:</strong> Ginger tea, turmeric latte, green tea, bone broth</li><li>🕰️ <strong>Meal Timing:</strong> Eat warm, cooked meals at regular times</li><li>💧 <strong>Hydration:</strong> Warm water throughout day, avoid cold water</li></ul></div><div style='background: #fce4ec; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏃 Exercise & Lifestyle Modifications:</h4><ul><li>🧘 <strong>Gentle Yoga:</strong> Marjaryasana (cat pose), Balasana (child pose), Trikonasana daily</li><li>🏊 <strong>Swimming:</strong> Low-impact exercise in warm water</li><li>🚶 <strong>Walking:</strong> 30 minutes daily on even surfaces</li><li>🔥 <strong>Heat Therapy:</strong> Warm compress or heating pad for 15-20 minutes</li><li>😴 <strong>Rest:</strong> Adequate sleep 7-8 hours, avoid overexertion</li><li>🧘 <strong>Stress Management:</strong> Meditation, pranayama, deep breathing</li><li>🌡️ <strong>Weather Care:</strong> Keep joints warm, wear protective clothing</li></ul></div><div style='background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>⚠️ Prevention & Long-term Management:</h4><ul><li>📊 <strong>Weight Management:</strong> Maintain healthy BMI to reduce joint stress</li><li>📋 <strong>Regular Monitoring:</strong> Track pain levels and mobility improvements</li><li>👥 <strong>Professional Support:</strong> Regular Ayurvedic consultations for personalized treatment</li><li>📚 <strong>Education:</strong> Learn about joint-friendly activities and ergonomics</li><li>🚫 <strong>Avoid Triggers:</strong> Identify and avoid foods/activities that worsen symptoms</li><li>🔄 <strong>Consistency:</strong> Follow treatment plan regularly for best results</li></ul></div><p style='color: #666; font-style: italic; margin-top: 20px;'>⚠️ <em>Important: This comprehensive guide is for educational purposes. Severe arthritis may require medical intervention. Consult qualified Ayurvedic practitioners for personalized treatment plans.</em></p></div>",
            append: !0,
          },
          // Digestive Issues
          indigestion: {
            type: "text",
            description: "ayurvedic solutions for digestive problems",
            text: "<h3>Digestive Issues - Ayurvedic Care</h3><p><strong>Causes:</strong> Weak digestive fire (Agni), irregular eating habits</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Triphala, Ajwain, Jeera, Hing (Asafoetida)</li><li><strong>Spices:</strong> Ginger, black pepper, long pepper (Trikatu)</li><li><strong>Diet:</strong> Eat warm foods, avoid overeating, proper meal timing</li><li><strong>Home Remedy:</strong> Ginger tea before meals, ajwain water</li></ul><p><strong>Routine:</strong> Regular meal times, walk after eating, avoid water during meals</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Insomnia
          insomnia: {
            type: "text",
            description: "ayurvedic treatment for sleep disorders",
            text: "<h3>Insomnia - Ayurvedic Solutions</h3><p><strong>Causes:</strong> Vata dosha excess, mental stress, irregular routine</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Ashwagandha, Brahmi, Jatamansi, Shankhpushpi</li><li><strong>Oil Therapy:</strong> Head massage with brahmi oil before sleep</li><li><strong>Diet:</strong> Warm milk with nutmeg, avoid caffeine evening</li><li><strong>Home Remedy:</strong> Chamomile tea, warm baths with lavender</li></ul><p><strong>Routine:</strong> Sleep by 10 PM, meditation, avoid screens before bed</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Asthma
          asthma: {
            type: "text",
            description: "ayurvedic treatment for asthma",
            text: "<h3>Asthma - Ayurvedic Treatment</h3><p><strong>Causes:</strong> Kapha dosha accumulation in lungs, allergens, stress</p><p><strong>Symptoms:</strong> Wheezing, breathlessness, chest tightness, coughing</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Vasaka, Pushkarmool, Kantakari, Bharangi</li><li><strong>Breathing:</strong> Pranayama, Anulom Vilom daily</li><li><strong>Diet:</strong> Warm foods, ginger tea, avoid cold dairy</li><li><strong>Home Remedy:</strong> Honey with ginger juice, steam inhalation with eucalyptus</li></ul><p><strong>Lifestyle:</strong> Avoid dust, practice yoga, maintain warm environment</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Migraine
          migraine: {
            type: "text",
            description: "ayurvedic treatment for migraine headaches",
            text: "<h3>Migraine - Ayurvedic Care</h3><p><strong>Causes:</strong> Pitta dosha imbalance, stress, irregular meals, hormonal changes</p><p><strong>Symptoms:</strong> Severe headache, nausea, light sensitivity, visual disturbances</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Brahmi, Jatamansi, Saraswatarishta, Medhya Rasayan</li><li><strong>Oil Treatment:</strong> Nasya with Anu oil, head massage with coconut oil</li><li><strong>Diet:</strong> Regular meals, avoid spicy foods, include ghee</li><li><strong>Home Remedy:</strong> Ginger paste on forehead, peppermint oil massage</li></ul><p><strong>Prevention:</strong> Stress management, adequate sleep, regular exercise</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Obesity
          obesity: {
            type: "text",
            description: "ayurvedic treatment for weight management",
            text: "<h3>Obesity - Ayurvedic Weight Management</h3><p><strong>Causes:</strong> Kapha dosha excess, slow metabolism, sedentary lifestyle</p><p><strong>Symptoms:</strong> Excess weight, fatigue, breathlessness, joint pain</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Guggul, Triphala, Garcinia, Vrikshamla</li><li><strong>Metabolism:</strong> Trikatu churna before meals</li><li><strong>Diet:</strong> Light meals, avoid sweet/oily foods, eat warm food</li><li><strong>Home Remedy:</strong> Honey-lemon water morning, green tea with ginger</li></ul><p><strong>Exercise:</strong> Daily walking, yoga, avoid daytime sleep</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Depression
          depression: {
            type: "text",
            description: "ayurvedic treatment for depression and anxiety",
            text: "<h3>Depression - Ayurvedic Mental Health</h3><p><strong>Causes:</strong> Vata-Kapha imbalance, stress, hormonal changes, lifestyle</p><p><strong>Symptoms:</strong> Sadness, loss of interest, fatigue, sleep disturbances</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Brahmi, Mandukaparni, Saraswatarishta, Ashwagandha</li><li><strong>Therapy:</strong> Shirodhara, Abhyanga massage</li><li><strong>Diet:</strong> Sattvic foods, avoid processed foods, regular meals</li><li><strong>Home Remedy:</strong> Tulsi tea, meditation, sunlight exposure</li></ul><p><strong>Lifestyle:</strong> Regular exercise, social connections, spiritual practices</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Thyroid
          thyroid: {
            type: "text",
            description: "ayurvedic treatment for thyroid disorders",
            text: "<h3>Thyroid Disorders - Ayurvedic Treatment</h3><p><strong>Causes:</strong> Vata-Kapha imbalance, stress, iodine deficiency, genetics</p><p><strong>Symptoms:</strong> Weight changes, fatigue, hair loss, mood swings</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Kanchanar Guggul, Punarnava, Varuna, Gokshura</li><li><strong>Minerals:</strong> Natural iodine sources, seaweed</li><li><strong>Diet:</strong> Coconut oil, iodine-rich foods, avoid soy products</li><li><strong>Home Remedy:</strong> Coconut oil pulling, neck exercises</li></ul><p><strong>Yoga:</strong> Sarvangasana, Halasana, Matsyasana for thyroid stimulation</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // PCOS
          pcos: {
            type: "text",
            description: "ayurvedic treatment for PCOS",
            text: "<h3>PCOS - Ayurvedic Hormonal Balance</h3><p><strong>Causes:</strong> Kapha-Vata imbalance, insulin resistance, stress, lifestyle</p><p><strong>Symptoms:</strong> Irregular periods, weight gain, acne, hair growth</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Shatavari, Lodhra, Ashoka, Dashmoolarishta</li><li><strong>Hormone Balance:</strong> Chandraprabha Vati, Kumaryasava</li><li><strong>Diet:</strong> Low glycemic foods, avoid refined sugar, include fiber</li><li><strong>Home Remedy:</strong> Fenugreek seeds water, cinnamon tea</li></ul><p><strong>Lifestyle:</strong> Regular exercise, stress management, adequate sleep</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Kidney Stones
          kidneystones: {
            type: "text",
            description: "ayurvedic treatment for kidney stones",
            text: "<h3>Kidney Stones - Ayurvedic Dissolution</h3><p><strong>Causes:</strong> Pitta dosha excess, dehydration, poor diet, genetics</p><p><strong>Symptoms:</strong> Severe back pain, painful urination, blood in urine</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Punarnava, Gokshura, Varuna, Chandraprabha Vati</li><li><strong>Stone Breaking:</strong> Patharchur (stone breaker) juice</li><li><strong>Diet:</strong> Plenty of water, coconut water, avoid calcium oxalate foods</li><li><strong>Home Remedy:</strong> Lemon water, horse gram soup</li></ul><p><strong>Prevention:</strong> Drink 3-4 liters water daily, reduce salt intake</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Liver Disorders
          liver: {
            type: "text",
            description: "ayurvedic treatment for liver health",
            text: "<h3>Liver Disorders - Ayurvedic Detox</h3><p><strong>Causes:</strong> Pitta dosha excess, alcohol, processed foods, stress</p><p><strong>Symptoms:</strong> Fatigue, jaundice, abdominal pain, digestive issues</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Bhumyamalaki, Kutki, Kalmegh, Arogyavardhini Vati</li><li><strong>Detox:</strong> Liver cleansing herbs, Panchakarma therapy</li><li><strong>Diet:</strong> Fresh fruits, vegetables, avoid alcohol, reduce fats</li><li><strong>Home Remedy:</strong> Turmeric milk, amla juice, bitter gourd juice</li></ul><p><strong>Lifestyle:</strong> Early dinner, avoid late nights, regular exercise</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Skin Disorders
          skin: {
            type: "text",
            description: "ayurvedic treatment for skin problems",
            text: "<h3>Skin Disorders - Ayurvedic Skin Care</h3><p><strong>Causes:</strong> Pitta dosha imbalance, toxins, stress, hormonal changes</p><p><strong>Symptoms:</strong> Acne, eczema, psoriasis, pigmentation, dryness</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Neem, Manjistha, Sariva, Khadira</li><li><strong>Blood Purification:</strong> Sarivadyasava, Mahamanjisthadi Kwath</li><li><strong>Diet:</strong> Fresh fruits, vegetables, avoid spicy/oily foods</li><li><strong>Home Remedy:</strong> Neem paste, turmeric face pack, rose water</li></ul><p><strong>External Care:</strong> Natural oils, avoid harsh chemicals, sun protection</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Hair Loss
          hairloss: {
            type: "text",
            description: "ayurvedic treatment for hair loss and hair problems",
            text: "<div style='padding: 20px; border-left: 4px solid #8BC34A;'><h3>💇 Hair Loss - Complete Ayurvedic Hair Care</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes (Ayurvedic Analysis):</h4><ul><li>🔥 <strong>Pitta Dosha Excess:</strong> Heat accumulation affecting hair follicles</li><li>🌬️ <strong>Vata Imbalance:</strong> Dryness and reduced nourishment to scalp</li><li>😰 <strong>Stress & Anxiety:</strong> Mental tension affecting hair growth cycle</li><li>🍽️ <strong>Poor Nutrition:</strong> Lack of essential vitamins and minerals</li><li>🧬 <strong>Genetic Factors:</strong> Family history of baldness</li><li>🔄 <strong>Hormonal Changes:</strong> DHT sensitivity and hormonal imbalance</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Comprehensive Herbal Treatment:</h4><ul><li>🌱 <strong>Primary Herbs:</strong> Bhringraj (Hair king), Amla, Fenugreek, Brahmi</li><li>🌱 <strong>Hair Oils:</strong> Coconut oil with curry leaves, Bhringraj oil, Amla oil</li><li>🌱 <strong>Internal Medicines:</strong> Kesh King capsules, Bhringrajasava</li><li>🌱 <strong>Hair Masks:</strong> Fenugreek paste, Egg and yogurt mask</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Effective Home Remedies:</h4><ul><li>🥥 <strong>Coconut Oil Massage:</strong> Warm coconut oil with curry leaves, massage scalp</li><li>🌰 <strong>Fenugreek Hair Pack:</strong> Soaked fenugreek paste applied weekly</li><li>🍋 <strong>Onion Juice:</strong> Fresh onion juice applied to scalp 3x week</li><li>🥚 <strong>Egg Hair Mask:</strong> Whole egg with honey, applied monthly</li><li>🌿 <strong>Amla Paste:</strong> Fresh amla paste for scalp nourishment</li></ul></div><div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🍽️ Hair-Healthy Diet:</h4><ul><li>✅ <strong>Include:</strong> Protein-rich foods, iron sources, biotin, vitamin E</li><li>✅ <strong>Beneficial:</strong> Eggs, fish, nuts, seeds, green vegetables, fruits</li><li>❌ <strong>Avoid:</strong> Excessive sugar, processed foods, smoking, alcohol</li><li>💧 <strong>Hydration:</strong> Drink plenty of water for hair hydration</li></ul></div><p style='color: #666; font-style: italic; margin-top: 20px;'>⚠️ <em>Consistency is key for hair growth. Results visible after 3-6 months of regular treatment.</em></p></div>",
            append: !0,
          },
          // Constipation - Enhanced Response
          constipation: {
            type: "text",
            description: "ayurvedic treatment for constipation and digestive health",
            text: "<div style='padding: 20px; border-left: 4px solid #FF9800;'><h3>💩 Constipation - Complete Digestive Health Solution</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes:</h4><ul><li>🌬️ <strong>Vata Dosha Excess:</strong> Dryness in digestive tract</li><li>🚰 <strong>Dehydration:</strong> Insufficient water intake</li><li>🍽️ <strong>Poor Diet:</strong> Low fiber, processed foods</li><li>💺 <strong>Sedentary Lifestyle:</strong> Lack of physical movement</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Ayurvedic Remedies:</h4><ul><li>🌱 <strong>Triphala:</strong> 1 tsp with warm water before bed</li><li>🌱 <strong>Isabgol:</strong> Psyllium husk with water</li><li>🌱 <strong>Castor Oil:</strong> 1 tsp with warm milk occasionally</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Home Remedies:</h4><ul><li>🍋 <strong>Lemon Water:</strong> Warm water with lemon juice morning</li><li>🍯 <strong>Honey Water:</strong> 2 tsp honey in warm water</li><li>🥒 <strong>High Fiber Foods:</strong> Papaya, prunes, figs daily</li></ul></div></div>",
            append: !0,
          },
          // Anemia - Enhanced Response
          anemia: {
            type: "text",
            description: "ayurvedic treatment for anemia and iron deficiency",
            text: "<div style='padding: 20px; border-left: 4px solid #E91E63;'><h3>🩸 Anemia - Iron Deficiency Treatment</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Symptoms & Causes:</h4><ul><li>😴 <strong>Fatigue:</strong> Constant tiredness and weakness</li><li>🫁 <strong>Breathlessness:</strong> Difficulty breathing on exertion</li><li>👁️ <strong>Pale Skin:</strong> Loss of natural color</li><li>💔 <strong>Heart Palpitations:</strong> Irregular heartbeat</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Iron-Rich Ayurvedic Treatment:</h4><ul><li>🌱 <strong>Punarnava:</strong> Natural blood purifier</li><li>🌱 <strong>Draksha:</strong> Grape-based iron supplement</li><li>🌱 <strong>Amalaki:</strong> Vitamin C for iron absorption</li><li>🌱 <strong>Lauha Bhasma:</strong> Ayurvedic iron preparation</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🍽️ Iron-Rich Diet Plan:</h4><ul><li>🥬 <strong>Green Leafy Vegetables:</strong> Spinach, kale, fenugreek leaves</li><li>🫘 <strong>Legumes:</strong> Lentils, chickpeas, kidney beans</li><li>🥩 <strong>Protein Sources:</strong> Lean meat, fish, eggs</li><li>🍇 <strong>Fruits:</strong> Pomegranate, dates, raisins, apricots</li></ul></div></div>",
            append: !0,
          },
          // COPD - Enhanced Response  
          copd: {
            type: "text",
            description: "ayurvedic treatment for COPD and lung health",
            text: "<div style='padding: 20px; border-left: 4px solid #2196F3;'><h3>🫁 COPD - Chronic Lung Care</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Understanding COPD:</h4><ul><li>🚬 <strong>Primary Cause:</strong> Long-term smoking damage</li><li>😤 <strong>Symptoms:</strong> Chronic cough, breathlessness, wheezing</li><li>🫁 <strong>Lung Damage:</strong> Reduced oxygen exchange capacity</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Respiratory Support:</h4><ul><li>🌱 <strong>Vasaka:</strong> Natural bronchodilator</li><li>🌱 <strong>Kantkari:</strong> Lung cleansing herb</li><li>🌱 <strong>Pushkarmool:</strong> Respiratory tonic</li><li>🫁 <strong>Pranayama:</strong> Breathing exercises for lung capacity</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Lung Care Remedies:</h4><ul><li>🍯 <strong>Honey-Ginger:</strong> Natural expectorant</li><li>🌱 <strong>Turmeric Milk:</strong> Anti-inflammatory support</li><li>🌿 <strong>Steam Inhalation:</strong> With eucalyptus oil</li></ul></div></div>",
            append: !0,
          },
          // Alzheimer's Disease - Enhanced Response
          alzheimers: {
            type: "text",
            description: "ayurvedic treatment for hair loss",
            text: "<h3>Hair Loss - Ayurvedic Hair Care</h3><p><strong>Causes:</strong> Pitta dosha excess, stress, genetics, poor nutrition</p><p><strong>Symptoms:</strong> Thinning hair, baldness, premature graying, dandruff</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Bhringraj, Amla, Fenugreek, Hibiscus</li><li><strong>Oil Treatment:</strong> Coconut oil with curry leaves, brahmi oil massage</li><li><strong>Diet:</strong> Protein-rich foods, iron sources, avoid excessive heat</li><li><strong>Home Remedy:</strong> Onion juice, egg mask, green tea rinse</li></ul><p><strong>Hair Care:</strong> Gentle massage, avoid harsh chemicals, natural shampoos</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Constipation
          constipation: {
            type: "text",
            description: "ayurvedic treatment for constipation",
            text: "<h3>Constipation - Ayurvedic Digestive Health</h3><p><strong>Causes:</strong> Vata dosha excess, dehydration, poor diet, sedentary lifestyle</p><p><strong>Symptoms:</strong> Difficulty passing stools, abdominal pain, bloating</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Triphala, Isabgol, Haritaki, Castor oil</li><li><strong>Laxatives:</strong> Natural fiber sources, prunes, figs</li><li><strong>Diet:</strong> High fiber foods, plenty of water, warm foods</li><li><strong>Home Remedy:</strong> Warm water with lemon, overnight soaked raisins</li></ul><p><strong>Lifestyle:</strong> Regular exercise, toilet routine, abdominal massage</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Anemia
          anemia: {
            type: "text",
            description: "ayurvedic treatment for anemia",
            text: "<h3>Anemia - Ayurvedic Blood Building</h3><p><strong>Causes:</strong> Pitta dosha deficiency, iron deficiency, poor absorption</p><p><strong>Symptoms:</strong> Fatigue, pale skin, weakness, shortness of breath</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Punarnava, Mandoor Bhasma, Draksha, Amalaki</li><li><strong>Iron Sources:</strong> Natural iron-rich herbs and foods</li><li><strong>Diet:</strong> Green leafy vegetables, dates, pomegranate, jaggery</li><li><strong>Home Remedy:</strong> Beetroot juice, spinach soup, raisin water</li></ul><p><strong>Absorption:</strong> Vitamin C rich foods, avoid tea with meals</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Gastritis
          gastritis: {
            type: "text",
            description: "ayurvedic treatment for gastritis",
            text: "<h3>Gastritis - Ayurvedic Stomach Care</h3><p><strong>Causes:</strong> Pitta dosha excess, spicy foods, stress, H.pylori infection</p><p><strong>Symptoms:</strong> Stomach pain, burning sensation, nausea, bloating</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Yashtimadhu, Shatavari, Amla, Coconut water</li><li><strong>Cooling:</strong> Gulkand, rose water, fennel seeds</li><li><strong>Diet:</strong> Bland foods, avoid spicy/acidic foods, small frequent meals</li><li><strong>Home Remedy:</strong> Coconut water, banana, rice water</li></ul><p><strong>Healing:</strong> Stress reduction, proper meal timing, gentle foods</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Menstrual Problems
          menstrual: {
            type: "text",
            description: "ayurvedic treatment for menstrual disorders",
            text: "<h3>Menstrual Problems - Ayurvedic Women's Health</h3><p><strong>Causes:</strong> Vata-Pitta imbalance, hormonal fluctuations, stress</p><p><strong>Symptoms:</strong> Irregular periods, painful cramps, heavy bleeding</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Shatavari, Ashoka, Lodhra, Kumaryasava</li><li><strong>Pain Relief:</strong> Ginger tea, warm sesame oil massage</li><li><strong>Diet:</strong> Iron-rich foods, warm foods during periods</li><li><strong>Home Remedy:</strong> Fenugreek seeds tea, jaggery with sesame</li></ul><p><strong>Regulation:</strong> Regular exercise, stress management, adequate rest</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Sinusitis
          sinusitis: {
            type: "text",
            description: "ayurvedic treatment for sinus problems",
            text: "<h3>Sinusitis - Ayurvedic Respiratory Care</h3><p><strong>Causes:</strong> Kapha dosha excess, allergies, cold, pollution</p><p><strong>Symptoms:</strong> Nasal congestion, headache, facial pain, post-nasal drip</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Trikatu, Haridra, Tulsi, Eucalyptus</li><li><strong>Nasal Treatment:</strong> Nasya with medicated oils, steam inhalation</li><li><strong>Diet:</strong> Warm foods, ginger tea, avoid cold dairy</li><li><strong>Home Remedy:</strong> Salt water gargle, turmeric milk, ginger honey</li></ul><p><strong>Prevention:</strong> Avoid allergens, maintain nasal hygiene, steam therapy</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Urinary Tract Infection
          uti: {
            type: "text",
            description: "ayurvedic treatment for UTI",
            text: "<h3>UTI - Ayurvedic Urinary Health</h3><p><strong>Causes:</strong> Pitta dosha excess, dehydration, poor hygiene, bacteria</p><p><strong>Symptoms:</strong> Burning urination, frequent urination, pelvic pain</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Gokshura, Punarnava, Chandanasava, Coriander</li><li><strong>Cooling:</strong> Coconut water, cucumber juice, watermelon</li><li><strong>Diet:</strong> Plenty of fluids, avoid spicy foods, cranberry juice</li><li><strong>Home Remedy:</strong> Barley water, baking soda water, coconut water</li></ul><p><strong>Hygiene:</strong> Proper cleanliness, cotton underwear, adequate hydration</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Cholesterol
          cholesterol: {
            type: "text",
            description: "ayurvedic treatment for high cholesterol",
            text: "<h3>High Cholesterol - Ayurvedic Heart Health</h3><p><strong>Causes:</strong> Kapha dosha excess, poor diet, sedentary lifestyle</p><p><strong>Symptoms:</strong> Often silent, may cause chest pain, fatigue</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Arjuna, Guggul, Lasuna, Pushkarmool</li><li><strong>Heart Tonic:</strong> Arjuna bark powder with warm water</li><li><strong>Diet:</strong> Low fat foods, oats, garlic, avoid fried foods</li><li><strong>Home Remedy:</strong> Garlic milk, flaxseed powder, green tea</li></ul><p><strong>Exercise:</strong> Regular cardio, yoga, stress management</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Bronchitis
          bronchitis: {
            type: "text",
            description: "ayurvedic treatment for bronchitis",
            text: "<h3>Bronchitis - Ayurvedic Lung Care</h3><p><strong>Causes:</strong> Kapha-Vata imbalance, cold, smoking, pollution</p><p><strong>Symptoms:</strong> Persistent cough, mucus production, chest discomfort</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Vasaka, Kantakari, Pippali, Tulsi</li><li><strong>Expectorant:</strong> Honey with ginger, mulethi powder</li><li><strong>Diet:</strong> Warm foods, ginger tea, avoid cold foods</li><li><strong>Home Remedy:</strong> Steam inhalation, turmeric milk, salt water gargle</li></ul><p><strong>Respiratory:</strong> Pranayama, avoid smoke, maintain humidity</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Allergies
          allergies: {
            type: "text",
            description: "ayurvedic treatment for allergies",
            text: "<h3>Allergies - Ayurvedic Immune Balance</h3><p><strong>Causes:</strong> Kapha dosha excess, weak immunity, environmental triggers</p><p><strong>Symptoms:</strong> Sneezing, runny nose, itching, skin rashes</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Haridra, Neem, Manjistha, Giloy</li><li><strong>Immunity:</strong> Chyawanprash, Giloy juice, turmeric</li><li><strong>Diet:</strong> Anti-inflammatory foods, avoid allergens, local honey</li><li><strong>Home Remedy:</strong> Neti pot, turmeric paste, ginger tea</li></ul><p><strong>Prevention:</strong> Strengthen immunity, avoid triggers, maintain hygiene</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Hemorrhoids (Piles)
          piles: {
            type: "text",
            description: "ayurvedic treatment for hemorrhoids",
            text: "<h3>Hemorrhoids (Piles) - Ayurvedic Relief</h3><p><strong>Causes:</strong> Vata dosha imbalance, constipation, sitting long hours</p><p><strong>Symptoms:</strong> Rectal bleeding, pain, itching, swelling</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Triphala, Kasisadi Taila, Arshkuthar Ras</li><li><strong>External:</strong> Sitz bath with neem water, coconut oil application</li><li><strong>Diet:</strong> High fiber foods, plenty of water, avoid spicy foods</li><li><strong>Home Remedy:</strong> Aloe vera gel, witch hazel, ice application</li></ul><p><strong>Prevention:</strong> Regular bowel movements, avoid straining, proper posture</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Fibromyalgia
          fibromyalgia: {
            type: "text",
            description: "ayurvedic treatment for fibromyalgia",
            text: "<h3>Fibromyalgia - Ayurvedic Pain Management</h3><p><strong>Causes:</strong> Vata dosha excess, stress, hormonal imbalance</p><p><strong>Symptoms:</strong> Widespread pain, fatigue, sleep disturbances, tender points</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Ashwagandha, Bala, Rasna, Guggul</li><li><strong>Pain Relief:</strong> Warm oil massage, Panchakarma therapy</li><li><strong>Diet:</strong> Anti-inflammatory foods, avoid processed foods</li><li><strong>Home Remedy:</strong> Warm baths, gentle stretching, meditation</li></ul><p><strong>Lifestyle:</strong> Stress management, regular sleep, gentle exercise</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Varicose Veins
          varicose: {
            type: "text",
            description: "ayurvedic treatment for varicose veins",
            text: "<h3>Varicose Veins - Ayurvedic Circulation</h3><p><strong>Causes:</strong> Vata-Pitta imbalance, poor circulation, standing long hours</p><p><strong>Symptoms:</strong> Visible enlarged veins, leg pain, swelling, heaviness</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Manjistha, Sariva, Gotu Kola, Horse Chestnut</li><li><strong>Circulation:</strong> Leg elevation, compression, gentle massage</li><li><strong>Diet:</strong> Anti-inflammatory foods, reduce salt, increase fiber</li><li><strong>Home Remedy:</strong> Apple cider vinegar, cold compress, witch hazel</li></ul><p><strong>Exercise:</strong> Walking, swimming, avoid prolonged standing</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Osteoporosis
          osteoporosis: {
            type: "text",
            description: "ayurvedic treatment for bone health",
            text: "<h3>Osteoporosis - Ayurvedic Bone Strength</h3><p><strong>Causes:</strong> Vata dosha excess, aging, calcium deficiency, hormonal changes</p><p><strong>Symptoms:</strong> Bone pain, fractures, loss of height, stooped posture</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Ashwagandha, Shatavari, Arjuna, Laksha</li><li><strong>Calcium:</strong> Natural calcium sources, sesame seeds, almonds</li><li><strong>Diet:</strong> Dairy products, green vegetables, avoid excess salt</li><li><strong>Home Remedy:</strong> Sesame seed laddu, milk with turmeric</li></ul><p><strong>Exercise:</strong> Weight-bearing exercises, yoga, sunlight exposure</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Tinnitus
          tinnitus: {
            type: "text",
            description: "ayurvedic treatment for ear ringing",
            text: "<div style='padding: 20px; border-left: 4px solid #9C27B0;'><h3>👂 Tinnitus - Ayurvedic Ear Health Management</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes:</h4><ul><li>💨 <strong>Vata Dosha Imbalance:</strong> Excessive air element affecting ear channels</li><li>🦠 <strong>Ear Infections:</strong> Chronic or recurring ear problems</li><li>🔊 <strong>Loud Noise Exposure:</strong> Damage from prolonged loud sounds</li><li>😰 <strong>Stress & Anxiety:</strong> Mental tension affecting auditory system</li><li>💊 <strong>Medications:</strong> Side effects of certain drugs</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Ayurvedic Treatment:</h4><ul><li>🌱 <strong>Herbs:</strong> Brahmi, Shankhpushpi, Saraswatarishta, Medhya Rasayan</li><li>💧 <strong>Nasya Therapy:</strong> Medicated oil drops in nose</li><li>🫒 <strong>Ear Drops:</strong> Warm sesame oil with garlic</li><li>💆 <strong>Head Massage:</strong> Regular oil massage around ears</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Home Remedies:</h4><ul><li>🧄 <strong>Garlic Oil:</strong> Warm garlic-infused sesame oil drops</li><li>🧅 <strong>Onion Juice:</strong> Fresh onion juice, 2-3 drops</li><li>🌿 <strong>Ginger Tea:</strong> Fresh ginger tea to improve circulation</li><li>💨 <strong>Steam Inhalation:</strong> With eucalyptus oil</li></ul></div></div>",
            append: !0,
          },
          // Cervical Spondylosis
          cervical: {
            type: "text",
            description: "ayurvedic treatment for cervical spondylosis",
            text: "<div style='padding: 20px; border-left: 4px solid #FF9800;'><h3>🦴 Cervical Spondylosis - Ayurvedic Neck Care</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes:</h4><ul><li>💨 <strong>Vata Dosha Excess:</strong> Degeneration of neck vertebrae</li><li>💻 <strong>Poor Posture:</strong> Long hours of computer work, wrong sleeping position</li><li>🏃 <strong>Lack of Exercise:</strong> Weak neck muscles and poor flexibility</li><li>⏰ <strong>Age Factor:</strong> Natural wear and tear of cervical discs</li><li>😰 <strong>Stress:</strong> Mental tension causing muscle stiffness</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Ayurvedic Treatment:</h4><ul><li>🌱 <strong>Herbs:</strong> Guggul, Shallaki, Rasna, Nirgundi, Ashwagandha</li><li>🫒 <strong>Oil Therapy:</strong> Warm sesame oil massage with Mahanarayan oil</li><li>🛀 <strong>Panchakarma:</strong> Abhyanga, Kizhi, Greeva Basti treatment</li><li>💊 <strong>Medicines:</strong> Yogaraja Guggul, Dashmoolarishta</li></ul></div><div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🍽️ Diet Recommendations:</h4><ul><li>✅ <strong>Include:</strong> Turmeric milk, ginger, garlic, green vegetables</li><li>🚫 <strong>Avoid:</strong> Cold foods, ice cream, excessive travel</li><li>🥛 <strong>Calcium Sources:</strong> Milk, sesame seeds, almonds</li><li>💧 <strong>Hydration:</strong> Warm water throughout the day</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Home Remedies & Exercises:</h4><ul><li>🫒 <strong>Hot Oil Massage:</strong> Warm coconut oil with camphor</li><li>🌿 <strong>Turmeric Paste:</strong> External application for inflammation</li><li>🧘 <strong>Neck Exercises:</strong> Gentle rotation, up-down movements</li><li>🧊 <strong>Hot/Cold Compress:</strong> Alternate therapy for pain relief</li><li>😴 <strong>Proper Pillow:</strong> Use orthopedic pillow for neck support</li></ul></div></div>",
            append: !0,
          },
          // Cervical Spondylosis
          cervical: {
            type: "text",
            description: "ayurvedic treatment for neck problems",
            text: "<h3>Cervical Spondylosis - Ayurvedic Neck Care</h3><p><strong>Causes:</strong> Vata dosha excess, poor posture, aging, desk work</p><p><strong>Symptoms:</strong> Neck pain, stiffness, headache, arm numbness</p><p><strong>Ayurvedic Remedies:</strong></p><ul><li><strong>Herbs:</strong> Rasna, Nirgundi, Ashwagandha, Guggul</li><li><strong>Oil Treatment:</strong> Warm oil massage, Nasya therapy</li><li><strong>Diet:</strong> Anti-inflammatory foods, calcium-rich foods</li><li><strong>Home Remedy:</strong> Hot compress, neck exercises, turmeric milk</li></ul><p><strong>Posture:</strong> Ergonomic workspace, regular breaks, proper pillow</p><p><em>Referred from online Ayurvedic resources</em></p>",
            append: !0,
          },
          // Cough
          cough: {
            type: "text",
            description: "ayurvedic treatment for cough",
            text: "<div style='padding: 20px; border-left: 4px solid #FF6B6B;'><h3>🫁 Cough - Complete Ayurvedic Treatment Guide</h3><div style='background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Symptoms & Types:</h4><ul><li>😤 <strong>Persistent Coughing:</strong> Continuous or occasional coughing spells</li><li>🤤 <strong>Wet Cough:</strong> Productive cough with mucus or phlegm</li><li>🌵 <strong>Dry Cough:</strong> Non-productive, hacking cough without mucus</li><li>😮‍💨 <strong>Throat Irritation:</strong> Scratchy, itchy sensation in throat</li><li>💔 <strong>Chest Discomfort:</strong> Tightness or pressure in chest area</li></ul></div><div style='background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🔍 Root Causes (Ayurvedic Analysis):</h4><ul><li>🦠 <strong>Viral/Bacterial Infections:</strong> Common cold, flu, respiratory infections</li><li>🌸 <strong>Allergies:</strong> Environmental irritants, pollen, dust mites</li><li>🔥 <strong>Acid Reflux (GERD):</strong> Stomach acid irritating throat</li><li>🌬️ <strong>Air Quality:</strong> Pollution, smoke, dry air conditions</li><li>🚬 <strong>Smoking:</strong> Tobacco or exposure to secondhand smoke</li><li>🌡️ <strong>Weather Changes:</strong> Cold air, humidity changes</li></ul></div><div style='background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🌿 Comprehensive Ayurvedic Remedies:</h4><ul><li>🌱 <strong>Sitopaladi Churna:</strong> 1/2 tsp with honey 3 times daily - excellent for all types of cough</li><li>🌱 <strong>Vasaka (Adhatoda vasica):</strong> Natural expectorant, 10ml syrup twice daily</li><li>🌱 <strong>Talisadi Churna:</strong> Specifically for dry cough, 1/4 tsp with warm water</li><li>🌱 <strong>Yashtimadhu (Licorice):</strong> Soothes throat, 1/2 tsp powder with milk</li><li>🌱 <strong>Kantakari:</strong> For chronic cough, as directed by practitioner</li><li>💨 <strong>Steam Inhalation:</strong> With eucalyptus oil or ajwain for 10-15 minutes</li></ul></div><div style='background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🏠 Powerful Home Remedies:</h4><ul><li>🍯 <strong>Ginger-Honey Mix:</strong> Fresh ginger juice with honey, 1 tsp 3 times daily</li><li>🥛 <strong>Turmeric Golden Milk:</strong> Warm milk with 1/2 tsp turmeric before bedtime</li><li>🧂 <strong>Salt Water Gargling:</strong> Warm salt water, gargle 3-4 times daily</li><li>🌿 <strong>Tulsi Tea:</strong> Holy basil leaves with black pepper and honey</li><li>🧅 <strong>Onion Syrup:</strong> Onion juice with honey, natural cough suppressant</li><li>💧 <strong>Warm Water:</strong> Sip warm water throughout day to keep throat moist</li></ul></div><div style='background: #fce4ec; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>🍽️ Dietary Recommendations:</h4><ul><li>✅ <strong>Include:</strong> Warm foods, ginger tea, honey, warm water, fresh fruits</li><li>✅ <strong>Beneficial:</strong> Pineapple (bromelain), warm soups, herbal teas</li><li>❌ <strong>Avoid:</strong> Cold drinks, ice cream, dairy (if mucus-producing), fried foods</li><li>❌ <strong>Limit:</strong> Sugar, processed foods, very spicy items</li><li>💧 <strong>Hydration:</strong> Warm fluids throughout day, avoid very cold beverages</li></ul></div><div style='background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 10px 0;'><h4>💡 Lifestyle & Prevention:</h4><ul><li>💨 <strong>Humidifier:</strong> Maintain moisture in air, especially during dry weather</li><li>🛌 <strong>Rest:</strong> Adequate sleep helps immune system fight infection</li><li>🚭 <strong>Avoid Irritants:</strong> Stay away from smoke, strong perfumes, dust</li><li>🧘 <strong>Breathing Exercises:</strong> Deep breathing, pranayama for lung health</li><li>🤲 <strong>Hand Hygiene:</strong> Wash hands frequently to prevent infections</li><li>💪 <strong>Immunity Boost:</strong> Vitamin C, zinc, proper nutrition</li></ul></div><p style='color: #666; font-style: italic; margin-top: 20px;'>⚠️ <em>Consult a healthcare provider if cough persists for more than 2 weeks, is accompanied by high fever, blood, or severe chest pain.</em></p></div>",
            append: !0,
          },
          // Fever
          fever: {
            type: "text",
            description: "ayurvedic treatment for fever",
            text: "\ud83c\udf21\ufe0f Fever Analysis:\\n\\n\ud83d\udccb Symptoms:\\n\u2022 Elevated body temperature (>100.4\u00b0F)\\n\u2022 Chills and excessive sweating\\n\u2022 Body aches and muscle weakness\\n\u2022 Headache and dizziness\\n\u2022 Loss of appetite and fatigue\\n\\n\ud83d\udd0d Causes:\\n\u2022 Viral or bacterial infections\\n\u2022 Inflammatory conditions in body\\n\u2022 Heat exhaustion or overexposure\\n\u2022 Side effects of certain medications\\n\u2022 Autoimmune disorders\\n\\n\ud83c\udf3f Ayurvedic Remedies:\\n\u2022 Maha Sudarshan Churna (2-3g daily)\\n\u2022 Amrita (Giloy) fresh juice or decoction\\n\u2022 Praval Pishti with rose water\\n\u2022 Chandanasava for cooling effect\\n\\n\ud83c\udfe0 Home Treatments:\\n\u2022 Cool compresses on forehead and wrists\\n\u2022 Plenty of fluids (water, herbal teas, coconut water)\\n\u2022 Light, easily digestible foods\\n\u2022 Complete rest in cool, ventilated environment\\n\\n\ud83d\udca1 Lifestyle During Fever:\\n\u2022 Complete bed rest until recovery\\n\u2022 Avoid heavy meals and dairy products\\n\u2022 Maintain electrolyte balance\\n\u2022 Monitor temperature every 2-3 hours\\n\\n\u26a0\ufe0f Prevention Guidelines:\\n\u2022 Practice good hand hygiene regularly\\n\u2022 Avoid close contact with infected persons\\n\u2022 Boost immunity with natural foods\\n\u2022 Ensure adequate sleep and proper nutrition",
            append: !0,
          },
          // Common Cold
          cold: {
            type: "text",
            description: "ayurvedic treatment for common cold",
            text: "\ud83e\udd27 Common Cold Analysis:\\n\\n\ud83d\udccb Symptoms:\\n\u2022 Runny or stuffy nose\\n\u2022 Frequent sneezing\\n\u2022 Mild sore throat\\n\u2022 Light cough and throat clearing\\n\u2022 Low-grade fever and mild headache\\n\\n\ud83d\udd0d Causes:\\n\u2022 Viral infections (mainly rhinovirus)\\n\u2022 Weakened immune system\\n\u2022 Cold weather exposure\\n\u2022 Stress and physical fatigue\\n\u2022 Close contact with infected individuals\\n\\n\ud83c\udf3f Ayurvedic Remedies:\\n\u2022 Trikatu Churna with honey (reduces Kapha)\\n\u2022 Haridra Khanda (turmeric preparation)\\n\u2022 Nasya therapy with Anu Taila\\n\u2022 Steam inhalation with Ajwain (carom seeds)\\n\\n\ud83c\udfe0 Home Treatments:\\n\u2022 Fresh ginger-tulsi tea (3-4 times daily)\\n\u2022 Warm turmeric milk with a pinch of black pepper\\n\u2022 Honey-lemon water first thing in morning\\n\u2022 Steam inhalation with eucalyptus oil\\n\\n\ud83d\udca1 Lifestyle Support:\\n\u2022 Adequate rest and quality sleep\\n\u2022 Stay warm and avoid cold environments\\n\u2022 Drink warm fluids throughout the day\\n\u2022 Avoid cold foods, ice cream, and cold drinks\\n\\n\u26a0\ufe0f Prevention Measures:\\n\u2022 Wash hands frequently with soap\\n\u2022 Avoid close contact with sick individuals\\n\u2022 Maintain balanced nutrition and vitamins\\n\u2022 Dress appropriately for weather conditions",
            append: !0,
          },
          // Acidity
          acidity: {
            type: "text",
            description: "ayurvedic treatment for acidity and heartburn",
            text: "\ud83d\udd25 Acidity Analysis:\\n\\n\ud83d\udccb Symptoms:\\n\u2022 Burning sensation in chest (heartburn)\\n\u2022 Sour or bitter taste in mouth\\n\u2022 Stomach pain and discomfort\\n\u2022 Bloating and excessive gas\\n\u2022 Nausea and occasional vomiting\\n\\n\ud83d\udd0d Causes:\\n\u2022 Consumption of spicy and oily foods\\n\u2022 Irregular eating habits and skipping meals\\n\u2022 Chronic stress and anxiety\\n\u2022 Certain medications (NSAIDs, antibiotics)\\n\u2022 Excessive smoking and alcohol consumption\\n\\n\ud83c\udf3f Ayurvedic Remedies:\\n\u2022 Avipattikar Churna (1 tsp after meals)\\n\u2022 Shatavari Churna with milk (cooling effect)\\n\u2022 Kamadudha Ras with sugar\\n\u2022 Fresh Amalaki (Amla) juice daily\\n\\n\ud83c\udfe0 Home Treatments:\\n\u2022 Cold milk consumption for immediate relief\\n\u2022 Fresh coconut water (natural antacid)\\n\u2022 Ripe banana eating on empty stomach\\n\u2022 Chewing fennel seeds after meals\\n\\n\ud83d\udca1 Dietary Guidelines:\\n\u2022 Eat smaller, more frequent meals\\n\u2022 Completely avoid spicy, fried, and acidic foods\\n\u2022 Sleep with head elevated (6-8 inches)\\n\u2022 Practice stress management techniques\\n\\n\u26a0\ufe0f Prevention Strategy:\\n\u2022 Maintain regular meal timings\\n\u2022 Identify and avoid personal trigger foods\\n\u2022 Maintain healthy body weight\\n\u2022 Quit smoking and limit alcohol intake",
            append: !0,
          },
          // Eye Problems
          eyeproblems: {
            type: "text",
            description: "ayurvedic treatment for eye problems",
            text: "👁️ Eye Problems Analysis:\\n\\n📋 Symptoms:\\n• Eye pain and discomfort\\n• Blurred or reduced vision\\n• Dry or watery eyes\\n• Redness and irritation\\n• Sensitivity to light\\n\\n🔍 Causes:\\n• Excessive screen time (digital eye strain)\\n• Lack of proper nutrition\\n• Environmental pollutants and dust\\n• Aging and natural wear\\n• Infections and allergies\\n\\n🌿 Ayurvedic Remedies:\\n• Triphala eye wash (cooled decoction)\\n• Netra Tarpana therapy with ghee\\n• Saptamrita Loha for vision\\n• Rose water for cooling effect\\n\\n🏠 Home Treatments:\\n• Cucumber slices on closed eyes\\n• Cold milk compresses\\n• Aloe vera gel around eyes\\n• Regular eye exercises and blinking\\n\\n💡 Lifestyle Recommendations:\\n• Follow 20-20-20 rule for screen time\\n• Ensure proper lighting while reading\\n• Include vitamin A rich foods\\n• Adequate sleep (7-8 hours)\\n\\n⚠️ Prevention Tips:\\n• Regular eye checkups\\n• UV protection sunglasses\\n• Maintain proper distance from screens\\n• Stay hydrated throughout the day",
            append: !0,
          },
          // Dental Problems
          dental: {
            type: "text",
            description: "ayurvedic treatment for dental problems",
            text: "🦷 Dental Problems Analysis:\\n\\n📋 Symptoms:\\n• Tooth pain and sensitivity\\n• Bleeding or swollen gums\\n• Bad breath (halitosis)\\n• Tooth decay and cavities\\n• Loose or shifting teeth\\n\\n🔍 Causes:\\n• Poor oral hygiene\\n• Excessive sugar consumption\\n• Bacterial infections\\n• Nutritional deficiencies\\n• Tobacco and alcohol use\\n\\n🌿 Ayurvedic Remedies:\\n• Oil pulling with sesame or coconut oil\\n• Neem twigs for natural cleaning\\n• Triphala mouth rinse\\n• Clove oil for pain relief\\n\\n🏠 Home Treatments:\\n• Salt water rinse (warm)\\n• Turmeric and mustard oil paste\\n• Guava leaves chewing\\n• Hydrogen peroxide diluted rinse\\n\\n💡 Oral Care Routine:\\n• Brush twice daily with fluoride toothpaste\\n• Daily flossing between teeth\\n• Tongue cleaning every morning\\n• Avoid sugary and acidic foods\\n\\n⚠️ Prevention Guidelines:\\n• Regular dental checkups (6 months)\\n• Quit smoking and tobacco\\n• Limit sticky and sweet foods\\n• Drink plenty of water",
            append: !0,
          },
          // Stress and Anxiety
          stress: {
            type: "text",
            description: "ayurvedic treatment for stress and anxiety",
            text: "🧘 Stress & Anxiety Analysis:\\n\\n📋 Symptoms:\\n• Persistent worry and tension\\n• Restlessness and irritability\\n• Difficulty concentrating\\n• Sleep disturbances\\n• Physical symptoms (headache, muscle tension)\\n\\n🔍 Causes:\\n• Work pressure and deadlines\\n• Financial concerns\\n• Relationship problems\\n• Health issues\\n• Major life changes\\n\\n🌿 Ayurvedic Remedies:\\n• Brahmi for mental clarity\\n• Ashwagandha for stress relief\\n• Jatamansi for anxiety\\n• Shankhpushpi for nerve calming\\n\\n🏠 Natural Treatments:\\n• Deep breathing exercises (Pranayama)\\n• Meditation and mindfulness\\n• Chamomile tea before bedtime\\n• Warm oil massage (Abhyanga)\\n\\n💡 Lifestyle Management:\\n• Regular exercise and yoga\\n• Maintain consistent sleep schedule\\n• Limit caffeine and alcohol\\n• Practice gratitude and positive thinking\\n\\n⚠️ Stress Prevention:\\n• Time management and prioritization\\n• Social support and communication\\n• Hobbies and recreational activities\\n• Professional counseling when needed",
            append: !0,
          },
          // Gas Problems
          gas: {
            type: "text",
            description: "ayurvedic treatment for gas and bloating",
            text: "💨 Gas & Bloating Analysis:\\n\\n📋 Symptoms:\\n• Abdominal bloating and distension\\n• Excessive flatulence\\n• Stomach cramps and discomfort\\n• Burping and belching\\n• Feeling of fullness\\n\\n🔍 Causes:\\n• Eating too quickly\\n• Consuming gas-producing foods\\n• Swallowing air while eating\\n• Digestive disorders\\n• Stress and anxiety\\n\\n🌿 Ayurvedic Remedies:\\n• Hingvastak Churna with warm water\\n• Ajwain (Carom seeds) with rock salt\\n• Pachak Churna after meals\\n• Ginger and lemon juice\\n\\n🏠 Home Treatments:\\n• Fennel seeds tea after meals\\n• Warm compress on abdomen\\n• Gentle abdominal massage\\n• Peppermint tea for relief\\n\\n💡 Dietary Guidelines:\\n• Eat slowly and chew thoroughly\\n• Avoid carbonated drinks\\n• Limit beans, cabbage, onions\\n• Include digestive spices (cumin, coriander)\\n\\n⚠️ Prevention Tips:\\n• Regular meal times\\n• Avoid talking while eating\\n• Stay hydrated with warm water\\n• Light walk after meals",
            append: !0,
          },
          // Weakness and Fatigue
          weakness: {
            type: "text",
            description: "ayurvedic treatment for weakness and fatigue",
            text: "💪 Weakness & Fatigue Analysis:\\n\\n📋 Symptoms:\\n• Persistent tiredness and low energy\\n• Muscle weakness\\n• Difficulty concentrating\\n• Reduced physical endurance\\n• Mental exhaustion\\n\\n🔍 Causes:\\n• Nutritional deficiencies (Iron, B12, Vitamin D)\\n• Poor sleep quality\\n• Chronic stress\\n• Underlying health conditions\\n• Sedentary lifestyle\\n\\n🌿 Ayurvedic Remedies:\\n• Chyawanprash for overall vitality\\n• Ashwagandha for energy boost\\n• Shatavari for rejuvenation\\n• Brahmi for mental clarity\\n\\n🏠 Natural Boosters:\\n• Dates and almonds daily\\n• Fresh fruit juices\\n• Herbal teas (Ginseng, Green tea)\\n• Adequate protein intake\\n\\n💡 Energy Enhancement:\\n• Regular exercise routine\\n• Consistent sleep schedule (7-8 hours)\\n• Balanced diet with whole foods\\n• Stress management techniques\\n\\n⚠️ Recovery Guidelines:\\n• Gradual increase in activity\\n• Stay hydrated throughout day\\n• Limit processed foods and sugar\\n• Medical checkup for persistent fatigue",
            append: !0,
          },
          // Nausea and Vomiting
          nausea: {
            type: "text",
            description: "ayurvedic treatment for nausea and vomiting",
            text: "🤢 Nausea & Vomiting Analysis:\\n\\n📋 Symptoms:\\n• Feeling of queasiness\\n• Urge to vomit\\n• Loss of appetite\\n• Excessive salivation\\n• Stomach discomfort\\n\\n🔍 Causes:\\n• Motion sickness\\n• Food poisoning or overeating\\n• Pregnancy (morning sickness)\\n• Medications side effects\\n• Digestive disorders\\n\\n🌿 Ayurvedic Remedies:\\n• Fresh ginger juice with honey\\n• Pudina (Mint) leaves decoction\\n• Dhanyak (Coriander) water\\n• Ela (Cardamom) powder with water\\n\\n🏠 Immediate Relief:\\n• Ginger tea or ginger candies\\n• Lemon water or lemon slices\\n• Peppermint tea\\n• Cold compresses on forehead\\n\\n💡 Management Tips:\\n• Eat small, frequent meals\\n• Avoid strong odors\\n• Stay hydrated with clear fluids\\n• Rest in well-ventilated area\\n\\n⚠️ When to Seek Help:\\n• Persistent vomiting for 24+ hours\\n• Signs of dehydration\\n• Severe abdominal pain\\n• Blood in vomit",
            append: !0,
          },
          website: {
            type: "url",
            description: "go to our official website",
            append: !1,
            url: "#",
          },
          doc: {
            type: "url",
            description:
              "visit online documentation",
            append: !1,
            url: "#",
          },
          support: {
            type: "url",
            description:
              "if you have any questions regarding VedaNex feel free and contact us by this command",
            append: !1,
            url: "#",
          },
          youtube: {
            type: "url",
            description:
              "visit our youtube channel with video guides on our themes and templates",
            append: !1,
            url: "#",
          },
          pass: {
            type: "password",
            description:
              "if you want to get strong password I can generate it for you, write  to get a 20 character password",
            append: !0,
          },
          joke: {
            type: "joke",
            description: "I can cheer you up by telling a joke",
            append: !0,
          },
          time: {
            type: "time",
            description: "display current time",
            append: !0,
          },
          clear: {
            type: "clear",
            description: "to clear current chat",
            append: !1,
          },
          commands: {
            type: "commands",
            description: "to list all available commands",
            append: !0,
          },
        };
        (o = "<ul>"),
          e.each(n, function (e, t) {
            o +=
              "<li><frenify_main>/" +
              e +
              "</frenify_main> - " +
              t.description +
              "</li>";
          });
        // Remove the override - let the welcome message use the predefined text
        var h = [
            "What did one pirate say to the other when he beat him at chess?<>Checkmatey.",
            "I burned 2000 calories today<>I left my food in the oven for too long.",
            "I startled my next-door neighbor with my new electric power tool. <>I had to calm him down by saying “Don’t worry, this is just a drill!”",
            "I broke my arm in two places. <>My doctor told me to stop going to those places.",
            "I quit my job at the coffee shop the other day. <>It was just the same old grind over and over.",
            "I never buy anything that has Velcro with it...<>it’s a total rip-off.",
            "I used to work at a soft drink can crushing company...<>it was soda pressing.",
            "I wondered why the frisbee kept on getting bigger. <>Then it hit me.",
            "I was going to tell you a fighting joke...<>but I forgot the punch line.",
            "What is the most groundbreaking invention of all time? <>The shovel.",
            "I’m starting my new job at a restaurant next week. <>I can’t wait.",
            "I visited a weight loss website...<>they told me I have to have cookies disabled.",
            "Did you hear about the famous Italian chef that recently died? <>He pasta way.",
            "Broken guitar for sale<>no strings attached.",
            "I could never be a plumber<>it’s too hard watching your life’s work go down the drain.",
            "I cut my finger slicing cheese the other day...<>but I think I may have grater problems than that.",
            "What time did you go to the dentist yesterday?<>Tooth-hurty.",
            "What kind of music do astronauts listen to?<>Neptunes.",
            "Rest in peace, boiled water. <>You will be mist.",
            "What is the only concert in the world that costs 45 cents? <>50 Cent, featuring Nickelback.",
            "It’s not a dad bod<> it’s a father figure.",
            "My wife recently went on a tropical food diet and now our house is full of this stuff. <>It’s enough to make a mango crazy.",
            "What do you call Santa’s little helpers? <>Subordinate clauses.",
            "Want to hear a construction joke? <>Sorry, I’m still working on it.",
            "What’s the difference between a hippo and a zippo? <>One is extremely big and heavy, and the other is a little lighter.",
            "I burnt my Hawaiian pizza today in the oven, <>I should have cooked it on aloha temperature.",
            "Anyone can be buried when they die<>but if you want to be cremated then you have to urn it.",
            "Where did Captain Hook get his hook? <>From the second-hand store.",
            "I am such a good singer that people always ask me to sing solo<>solo that they can’t hear me.",
            "I am such a good singer that people ask me to sing tenor<>tenor twelve miles away.",
            "Occasionally to relax I just like to tuck my knees into my chest and lean forward.<> That’s just how I roll.",
            "What did the glass of wine say to the glass of beer? Nothing. <>They barley knew each other.",
            "I’ve never trusted stairs. <>They are always up to something.",
            "Why did Shakespeare’s wife leave him? <>She got sick of all the drama.",
            "I just bought a dictionary but all of the pages are blank. <>I have no words to describe how mad I am.",
            "If you want to get a job at the moisturizer factory... <>you’re going to have to apply daily.",
            "I don’t know what’s going to happen next year. <>It’s probably because I don’t have 2020 vision.",
            "Want to hear a joke about going to the bathroom? <>Urine for a treat.",
            "I couldn’t figure out how to use the seat belt. <>Then it just clicked.",
            "I got an email the other day teaching me how to read maps backwards<>turns out it was just spam.",
            "I’m reading a book about anti-gravity.<> It’s impossible to put down!",
            "You’re American when you go into the bathroom, and you’re American when you come out, but do you know what you are while you’re in there?<> European.",
            "Did you know the first French fries weren’t actually cooked in France?<> They were cooked in Greece.",
            "Want to hear a joke about a piece of paper? Never mind... <>it’s tearable.",
            "I just watched a documentary about beavers. <>It was the best dam show I ever saw!",
            "If you see a robbery at an Apple Store what re you?<> An iWitness?",
            "Spring is here! <>I got so excited I wet my plants!",
            "What’s Forrest Gump’s password?<> 1forrest1",
            "Why did the Clydesdale give the pony a glass of water? <>Because he was a little horse!",
            'CASHIER: "Would you like the milk in a bag, sir?" <>DAD: "No, just leave it in the carton!’”',
            "Did you hear about the guy who invented Lifesavers? <>They say he made a mint.",
            "I bought some shoes from a drug dealer.<> I don’t know what he laced them with, but I was tripping all day!",
            "Why do chicken coops only have two doors?<> Because if they had four, they would be chicken sedans!",
            "How do you make a Kleenex dance? <>Put a little boogie in it!",
            'A termite walks into a bar and asks<>"Is the bar tender here?"',
            "Why did the invisible man turn down the job offer?<> He couldn’t see himself doing it.",
            "I used to have a job at a calendar factory <>but I got the sack because I took a couple of days off.",
            'A woman is on trial for beating her husband to death with his guitar collection. Judge says, "First offender?" <>She says, "No, first a Gibson! Then a Fender!”',
            "How do you make holy water?<> You boil the hell out of it.",
            "I had a dream that I was a muffler last night.<> I woke up exhausted!",
            "Did you hear about the circus fire?<> It was in tents!",
            "Don’t trust atoms.<> They make up everything!",
            "How many tickles does it take to make an octopus laugh? <>Ten-tickles.",
            "I’m only familiar with 25 letters in the English language.<> I don’t know why.",
            "Why did the cow in the pasture get promoted at work?<> Because he is OUT-STANDING in his field!",
            "What do prisoners use to call each other?<> Cell phones.",
            "Why couldn’t the bike standup by itself? <>It was two tired.",
            "Who was the fattest knight at King Arthur’s round table?<> Sir Cumference.",
            "Did you see they made round bails of hay illegal in Wisconsin? <>It’s because the cows weren’t getting a square meal.",
            "You know what the loudest pet you can get is?<> A trumpet.",
            "What do you get when you cross a snowman with a vampire?<> Frostbite.",
            "What do you call a deer with no eyes?<> No idea!",
            "Can February March? <>No, but April May!",
            "What do you call a lonely cheese? <>Provolone.",
            "Why can’t you hear a pterodactyl go to the bathroom?<> Because the pee is silent.",
            "What did the buffalo say to his son when he dropped him off at school?<> Bison.",
            "What do you call someone with no body and no nose? <>Nobody knows.",
            "You heard of that new band 1023MB? <>They’re good but they haven’t got a gig yet.",
            "Why did the crab never share?<> Because he’s shellfish.",
            "How do you get a squirrel to like you? <>Act like a nut.",
            "Why don’t eggs tell jokes? <>They’d crack each other up.",
            "Why can’t a nose be 12 inches long? <>Because then it would be a foot.",
            "Did you hear the rumor about butter? <>Well, I’m not going to spread it!",
            "I made a pencil with two erasers. <>It was pointless.",
            "I used to hate facial hair...<>but then it grew on me.",
            "I decided to sell my vacuum cleaner—<>it was just gathering dust!",
            "I had a neck brace fitted years ago<> and I’ve never looked back since.",
            "You know, people say they pick their nose,<> but I feel like I was just born with mine.",
            "What do you call an elephant that doesn’t matter?<> An irrelephant.",
            "What do you get from a pampered cow? <>Spoiled milk.",
            "It’s inappropriate to make a ’dad joke’ if you’re not a dad.<> It’s a faux pa.",
            "How do lawyers say goodbye? <>Sue ya later!",
            "Wanna hear a joke about paper? <>Never mind—it’s tearable.",
            "What’s the best way to watch a fly fishing tournament? <>Live stream.",
            "I could tell a joke about pizza,<> but it’s a little cheesy.",
            "When does a joke become a dad joke?<> When it becomes apparent.",
            "What’s an astronaut’s favorite part of a computer? <>The space bar.",
            "What did the shy pebble wish for?<>That she was a little boulder.",
            "I’m tired of following my dreams. <>I’m just going to ask them where they are going and meet up with them later.",
            "Did you hear about the guy whose whole left side was cut off? <>He’s all right now.",
            "Why didn’t the skeleton cross the road? <>Because he had no guts.",
            "What did one nut say as he chased another nut? <> I’m a cashew!",
            "Chances are if you’ve seen one shopping center...<> you’ve seen a mall.",
            "I knew I shouldn’t steal a mixer from work...<>but it was a whisk I was willing to take.",
            "How come the stadium got hot after the game? <>Because all of the fans left.",
            "Why was it called the dark ages? <>Because of all the knights.",
            "Why did the tomato blush? <>Because it saw the salad dressing.",
            "Did you hear the joke about the wandering nun? <>She was a roman catholic.",
            "What creature is smarter than a talking parrot? <>A spelling bee.",
            "I’ll tell you what often gets over looked...<> garden fences.",
            "Why did the kid cross the playground? <>To get to the other slide.",
            "Why do birds fly south for the winter?<> Because it’s too far to walk.",
            "What is a centipedes’s favorite Beatle song? <> I want to hold your hand, hand, hand, hand...",
            "My first time using an elevator was an uplifting experience. <>The second time let me down.",
            "To be Frank...<> I’d have to change my name.",
            "Slept like a log last night … <>woke up in the fireplace.",
            "Why does a Moon-rock taste better than an Earth-rock? <>Because it’s a little meteor.",
            "How many South Americans does it take to change a lightbulb?<> A Brazilian",
            "I don’t trust stairs.<> They’re always up to something.",
            "A police officer caught two kids playing with a firework and a car battery.<> He charged one and let the other one off.",
            "What is the difference between ignorance and apathy?<>I don’t know and I don’t care.",
            "I went to a Foo Fighters Concert once... <>It was Everlong...",
            "Some people eat light bulbs. <>They say it’s a nice light snack.",
            "What do you get hanging from Apple trees? <> Sore arms.",
            "Last night me and my girlfriend watched three DVDs back to back.<> Luckily I was the one facing the TV.",
            "I got a reversible jacket for Christmas,<> I can’t wait to see how it turns out.",
            "What did Romans use to cut pizza before the rolling cutter was invented? <>Lil Caesars",
            "My pet mouse ’Elvis’ died last night. <>He was caught in a trap..",
            "Never take advice from electrons. <>They are always negative.",
            "Why are oranges the smartest fruit? <>Because they are made to concentrate. ",
            "What did the beaver say to the tree? <>It’s been nice gnawing you.",
            "How do you fix a damaged jack-o-lantern?<> You use a pumpkin patch.",
            "What did the late tomato say to the early tomato? <>I’ll ketch up",
            "I have kleptomania...<>when it gets bad, I take something for it.",
            "I used to be addicted to soap...<> but I’m clean now.",
            "When is a door not a door?<> When it’s ajar.",
            "I made a belt out of watches once...<> It was a waist of time.",
            "This furniture store keeps emailing me,<> all I wanted was one night stand!",
            "How do you find Will Smith in the snow?<>  Look for fresh prints.",
            "I just read a book about Stockholm syndrome.<> It was pretty bad at first, but by the end I liked it.",
            "Why do trees seem suspicious on sunny days? <>Dunno, they’re just a bit shady.",
            "If at first you don’t succeed<> sky diving is not for you!",
            "What kind of music do mummy’s like?<>Rap",
            "A book just fell on my head. <>I only have my shelf to blame.",
            "What did the dog say to the two trees? <>Bark bark.",
            "If a child refuses to sleep during nap time...<> are they guilty of resisting a rest?",
            "Have you ever heard of a music group called Cellophane?<> They mostly wrap.",
            "What did the mountain climber name his son?<>Cliff.",
            "Why should you never trust a pig with a secret?<> Because it’s bound to squeal.",
            "Why are mummys scared of vacation?<> They’re afraid to unwind.",
            "Whiteboards ...<> are remarkable.",
            "What kind of dinosaur loves to sleep?<>A stega-snore-us.",
            "What kind of tree fits in your hand?<> A palm tree!",
            "I used to be addicted to the hokey pokey<> but I turned myself around.",
            "How many tickles does it take to tickle an octopus?<> Ten-tickles!",
            "What musical instrument is found in the bathroom?<> A tuba toothpaste.",
            "My boss told me to attach two pieces of wood together... <>I totally nailed it!",
            "What was the pumpkin’s favorite sport?<>Squash.",
            "What do you call corn that joins the army?<> Kernel.",
            "I’ve been trying to come up with a dad joke about momentum <>but I just can’t seem to get it going.",
            "Why don’t sharks eat clowns? <> Because they taste funny.",
            "Just read a few facts about frogs.<> They were ribbiting.",
            "Why didn’t the melons get married?<>Because they cantaloupe.",
            "What’s a computer’s favorite snack?<>Microchips!",
            "Why was the robot so tired after his road trip?<>He had a hard drive.",
            "Why did the computer have no money left?<>Someone cleaned out its cache!",
            "I’m not anti-social. <>I’m just not user friendly.",
            "Why did the computer get cold?<>Because it forgot to close windows.",
            "What is an astronaut’s favorite key on a keyboard?<>The space bar!",
            "What’s the difference between a computer salesman and a used-car salesman?<>The used-car salesman KNOWS when he’s lying.",
            "If at first you don’t succeed...<> call it version 1.0",
            "Why did Microsoft PowerPoint cross the road?<>To get to the other slide!",
            "What did the computer do at lunchtime?<>Had a byte!",
            "Why did the computer keep sneezing?<>It had a virus!",
            "What did one toilet say to the other?<>You look a bit flushed.",
            "Why did the picture go to jail?<>Because it was framed.",
            "What did one wall say to the other wall?<>I’ll meet you at the corner.",
            "What do you call a boy named Lee that no one talks to?<>Lonely",
            "Why do bicycles fall over?<>Because they are two-tired!",
            "Why was the broom late?<>It over swept!",
            "What part of the car is the laziest?<>The wheels, because they are always tired!",
            "What’s the difference between a TV and a newspaper?<>Ever tried swatting a fly with a TV?",
            "What did one elevator say to the other elevator?<>I think I’m coming down with something!",
            "Why was the belt arrested?<>Because it held up some pants!",
            "What makes the calendar seem so popular?<>Because it has a lot of dates!",
            "Why did Mickey Mouse take a trip into space?He wanted to find Pluto!",
            "Why do you go to bed every night?<>Because the bed won’t come to you!",
            "What has four wheels and flies?<>A garbage truck!",
            "Why did the robber take a bath before he stole from the bank?<>He wanted to make a clean get away!",
            "Just watched a documentary about beavers.<>It was the best damn program I’ve ever seen.",
            "Slept like a log last night<>woke up in the fireplace.",
            "Why did the scarecrow win an award?<>Because he was outstanding in his field.",
            "Why does a chicken coop only have two doors? <>Because if it had four doors it would be a chicken sedan.",
            "What’s the difference between an African elephant and an Indian elephant? <>About 5000 miles",
            "Why did the coffee file a police report? <>It got mugged.",
            "What did the grape do when he got stepped on? <>He let out a little wine.",
            "How many apples grow on a tree? <>All of them.",
            "What name do you give a person with a rubber toe? <>Roberto",
            "Did you hear about the kidnapping at school? <>It’s fine, he woke up.",
            "Why do scuba divers fall backwards into the water? <>Because if they fell forwards they’d still be in the boat.",
            "How does a penguin build it’s house? <>Igloos it together.",
            "What do you call a man with a rubber toe?<>Roberto",
            "Did you hear about the restaurant on the moon?<>Great food, no atmosphere.",
            "Why was the belt sent to jail?<>For holding up a pair of pants!",
            "Did you hear about the scientist who was lab partners with a pot of boiling water?<>He had a very esteemed colleague.",
            "What happens when a frogs car dies?<>He needs a jump. If that doesn’t work he has to get it toad.",
            "What did the flowers do when the bride walked down the aisle?<>They rose.",
            "Why did the man fall down the well?<>Because he couldn’t see that well.",
            "My boss told me to have a good day...<>...so I went home.",
            "How can you tell it’s a dogwood tree?<>By the bark.",
            "Did you hear about the kidnapping at school?<>It’s fine, he woke up.",
            "Why is Peter Pan always flying?<>Because he Neverlands.",
            "Which state has the most streets?<>Rhode Island.",
            "What do you call 26 letters that went for a swim?<>Alphawetical.",
            "Why was the color green notoriously single?<>It was always so jaded.",
            "Why did the coach go to the bank?<>To get his quarterback.",
            "How do celebrities stay cool?<>They have many fans.",
            "What’s the most depressing day of the week?<>sadder day.",
            "Dogs can’t operate MRI machines<>But catscan.",
            "I was going to tell a time-traveling joke<>but you guys didn’t like it.",
            "Stop looking for the perfect match<>instead look for a lighter.",
            "I told my doctor I heard buzzing<>but he said it’s just a bug going around.",
            "What kind of car does a sheep like to drive?<>A lamborghini.",
            "What did the accountant say while auditing a document?<>This is taxing.",
            "What did the two pieces of bread say on their wedding day?<>It was loaf at first sight.",
            "Why do melons have weddings?<>Because they cantaloupe.",
            "What did the drummer call his twin daughters?<>Anna One, Anna Two!",
            "What do you call a toothless bear?<> A gummy bear!",
            "Two goldfish are in a tank. <>One says to the other, “Do you know how to drive this thing?”",
            "What’s Forrest Gump’s password?<>1forrest1",
            "What is a child guilty of if they refuse to nap?<> Resisting a rest.",
            "I know a lot of jokes about retired people<>but none of them work.",
            "Why are spiders so smart?<>They can find everything on the web.",
            "What has one head, one foot, and four legs?<> A bed.",
            "What does a house wear?<> Address.",
            "What’s red and smells like blue paint?<>Red paint.",
            "My son asked me to put his shoes on<> but I don’t think they’ll fit me.",
            "I’ve been bored recently, so I decided to take up fencing.<> The neighbors keep demanding that I put it back.",
            "What do you call an unpredictable camera?<>A loose Canon.",
            "Which U.S. state is known for its especially small soft drinks?<>Minnesota.",
            "What do sprinters eat before a race?<> Nothing—they fast.",
            "I’m so good at sleeping...<>I can do it with my eyes closed.",
            "People are usually shocked that I have a Police record.<>But I love their greatest hits!",
            "I told my girlfriend she drew on her eyebrows too high.<> She seemed surprised.",
            "What do you call a fibbing cat?<> A lion.",
            "Why shouldn’t you write with a broken pencil?<> Because it’s pointless.",
            "I like telling Dad jokes…<>sometimes he laughs.",
            "How do you weigh a millennial?<> In Instagrams.",
            "The wedding was so beautiful<>even the cake was in tiers.",
            "What’s the most patriotic sport?<> Flag football.",
          ],
          c = !1;
        if (1 === i) {
          // This is the first message in a chat - use enhanced NLP system
          var userInput = s.toLowerCase();
          
          // Use the enhanced NLP system for all messages
          var nlpResult = findCSVDiseaseMatch(s);  // Pass original input, not lowercase
          if (nlpResult) {
            if (nlpResult.type === 'general') {
              // Handle general knowledge responses
              t = nlpResult.response;
              a = !0;
              c = !1;
            } else {
              // Handle medical condition responses with comprehensive CSV format
              t = generateCSVResponse(nlpResult);
              a = !0;
              c = !1;
            }
          }
          // Check for hypertension keywords
          else if (userInput.includes('hypertension') || userInput.includes('high blood pressure') || userInput.includes('blood pressure') || userInput.includes('bp high') ||
                   userInput.includes('high bp') || userInput.includes('pressure high') || userInput.includes('bp problem') ||
                   userInput.includes('systolic') || userInput.includes('diastolic') || userInput.includes('heart pressure')) {
            var m = n['hypertension'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for arthritis keywords
          else if (userInput.includes('arthritis') || userInput.includes('joint pain') || userInput.includes('joint ache') || userInput.includes('knee pain') || userInput.includes('back pain') || userInput.includes('backpain') ||
                   userInput.includes('rheumatoid') || userInput.includes('osteoarthritis') || userInput.includes('stiff joints') ||
                   userInput.includes('swollen joints') || userInput.includes('joints hurt') || userInput.includes('gout') ||
                   userInput.includes('hip pain') || userInput.includes('shoulder pain') || userInput.includes('ankle pain') || userInput.includes('lower back pain') || userInput.includes('spine pain')) {
            var m = n['arthritis'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for cough keywords
          else if (userInput.includes('cough') || userInput.includes('dry cough') || userInput.includes('wet cough') || userInput.includes('persistent cough') || userInput.includes('chronic cough') || userInput.includes('coughing') || userInput.includes('throat irritation') || userInput.includes('khasi') || userInput.includes('cough problem') || userInput.includes('i have cough') || userInput.includes('have a cough')) {
            var m = n['cough'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for fever keywords
          else if (userInput.includes('fever') || userInput.includes('high temperature') || userInput.includes('temperature') || userInput.includes('pyrexia') || userInput.includes('flu') || userInput.includes('viral fever') || userInput.includes('cold fever') || userInput.includes('bukhar')) {
            var m = n['fever'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for common cold keywords
          else if (userInput.includes('cold') || userInput.includes('common cold') || userInput.includes('runny nose') || userInput.includes('stuffy nose') || userInput.includes('nasal congestion') || userInput.includes('sneezing') || userInput.includes('sore throat') || userInput.includes('zukam')) {
            var m = n['cold'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for digestive issues
          else if (userInput.includes('indigestion') || userInput.includes('stomach') || userInput.includes('digestive') || userInput.includes('stomach pain') || userInput.includes('acidity') || userInput.includes('gas problem')) {
            var m = n['indigestion'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for insomnia
          else if (userInput.includes('insomnia') || userInput.includes('sleep') || userInput.includes('sleeping') || userInput.includes('sleep problem') || userInput.includes('sleepless') || userInput.includes('cant sleep')) {
            var m = n['insomnia'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for asthma
          else if (userInput.includes('asthma') || userInput.includes('wheezing') || userInput.includes('breathlessness') || userInput.includes('breathing problem')) {
            var m = n['asthma'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for migraine
          else if (userInput.includes('migraine') || userInput.includes('severe headache') || userInput.includes('head pain')) {
            var m = n['migraine'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for headache
          else if (userInput.includes('headache') || userInput.includes('head ache') || userInput.includes('tension headache') || userInput.includes('cluster headache') || userInput.includes('sinus headache') || userInput.includes('pain in head')) {
            var m = n['migraine'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for obesity
          else if (userInput.includes('obesity') || userInput.includes('overweight') || userInput.includes('weight loss') || userInput.includes('fat') ||
                   userInput.includes('weight gain') || userInput.includes('weight problem') || userInput.includes('lose weight') ||
                   userInput.includes('reduce weight') || userInput.includes('belly fat') || userInput.includes('weight management')) {
            var m = n['obesity'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for depression/anxiety/stress
          else if (userInput.includes('depression') || userInput.includes('sad') || userInput.includes('anxiety') || userInput.includes('mental health') ||
                   userInput.includes('depressed') || userInput.includes('feeling low') || userInput.includes('mood disorder') ||
                   userInput.includes('stress') || userInput.includes('panic attack') || userInput.includes('worried') ||
                   userInput.includes('panic') || userInput.includes('nervousness') || userInput.includes('restless') || userInput.includes('overthinking')) {
            var m = n['depression'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for thyroid
          else if (userInput.includes('thyroid') || userInput.includes('hyperthyroid') || userInput.includes('hypothyroid') || userInput.includes('thyroid problem') ||
                   userInput.includes('goiter') || userInput.includes('thyroid gland') || userInput.includes('tsh')) {
            var m = n['thyroid'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for PCOS
          else if (userInput.includes('pcos') || userInput.includes('pcod') || userInput.includes('irregular periods') || userInput.includes('hormonal imbalance') ||
                   userInput.includes('ovarian cyst') || userInput.includes('period problem') || userInput.includes('menstrual irregular')) {
            var m = n['pcos'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for kidney stones
          else if (userInput.includes('kidney stone') || userInput.includes('kidney pain') || userInput.includes('stone') || userInput.includes('renal calculi') ||
                   userInput.includes('kidney problem') || userInput.includes('painful urination') || userInput.includes('blood in urine')) {
            var m = n['kidneystones'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for liver problems
          else if (userInput.includes('liver') || userInput.includes('hepatitis') || userInput.includes('jaundice') || userInput.includes('liver problem') ||
                   userInput.includes('fatty liver') || userInput.includes('liver disease') || userInput.includes('yellow eyes')) {
            var m = n['liver'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for skin problems
          else if (userInput.includes('skin') || userInput.includes('acne') || userInput.includes('eczema') || userInput.includes('psoriasis') || userInput.includes('skin problem') ||
                   userInput.includes('pimples') || userInput.includes('rash') || userInput.includes('dry skin') || userInput.includes('itchy skin')) {
            var m = n['skin'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for hair loss
          else if (userInput.includes('hair loss') || userInput.includes('baldness') || userInput.includes('hair fall') || userInput.includes('alopecia') ||
                   userInput.includes('hair problem') || userInput.includes('thinning hair') || userInput.includes('hair growth') || userInput.includes('dandruff')) {
            var m = n['hairloss'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for constipation
          else if (userInput.includes('constipation') || userInput.includes('constipated') || userInput.includes('bowel movement') || userInput.includes('hard stool') ||
                   userInput.includes('difficulty passing stool') || userInput.includes('irregular bowel') || userInput.includes('no motion')) {
            var m = n['constipation'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // Check for anemia
          else if (userInput.includes('anemia') || userInput.includes('anaemia') || userInput.includes('iron deficiency') || userInput.includes('low hemoglobin') ||
                   userInput.includes('weakness') || userInput.includes('fatigue') || userInput.includes('pale skin')) {
            var m = n['anemia'];
            t = m.text;
            a = m.append;
            c = !1;
          }
          // If no disease detected, show welcome message
          else {
            t = n['welcome'].text;
          }
        }
        else if ("/" === s.slice(0, 1)) {
          var d = s.substring(1),
            f = /pass \d/i,
            u = 15;
          f.test(d) && ((u = d.split(" ")[1]), (d = "pass"));
          var p = 1;
          if (
            ((f = /joke \d/i).test(d) && ((p = d.split(" ")[1]), (d = "joke")),
            n.hasOwnProperty(d))
          ) {
            var m = n[d],
              g = m.type;
            if ("text" === g) t = m.text;
            else if ("url" === g) window.location.href = m.url;
            else if ("password" === g) {
              var y =
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789![]{}()%&*$#^<>~@|",
                v = "";
              u > 1e3 &&
                ((t +=
                  "<p>I don't think that you want to get this password. Maximum password characters are: 1000.</p><p>Your password with 1000 characters:</p>"),
                (u = 1e3));
              for (var w = 0; w < u; w++)
                v += y.charAt(Math.floor(Math.random() * y.length));
              t +=
                "<frenify_uselect>" +
                (v = r.escapeHTML(v)) +
                "</frenify_uselect>";
            } else if ("time" === g) {
              var b,
                k = new Date(),
                C = 10 > k.getHours() ? "0" + k.getHours() : k.getHours();
              t =
                C +
                ":" +
                (10 > k.getMinutes() ? "0" + k.getMinutes() : k.getMinutes()) +
                ":" +
                (10 > k.getSeconds() ? "0" + k.getSeconds() : k.getSeconds());
            } else if ("clear" === g)
              e(".fn__chatbot .chat__item.active").html("");
            else if ("joke" === g) {
              if (p > 1) {
                var I = r.shuffleArray(h).slice(0, p);
                if (((t = "<ul>"), p >= 1 && p <= h.length))
                  for (var W = 0; W < p; W++) t += "<li>" + I[W] + "</li>";
                t += "</ul>";
              } else t = h[Math.floor(Math.random() * h.length)];
            } else "commands" === g && (t = o);
            a = m.append;
          }
        } else {
          // Use enhanced NLP system for all regular chat messages
          var nlpResult = findCSVDiseaseMatch(s);  // Pass original input, not lowercase
          if (nlpResult) {
            if (nlpResult.type === 'general') {
              // Handle general knowledge responses
              t = nlpResult.response;
              a = !0;
              c = !1;
            } else {
              // Handle medical condition responses with comprehensive CSV format
              t = generateCSVResponse(nlpResult);
              a = !0;
              c = !1;
            }
          }
          // If no NLP match found, use intelligent fallback
          else {
            t = generateIntelligentFallback(s);
            a = !0;
            c = !1;
          }
        }
        // Response processing and display logic
        a &&
            (e(".fn__chat_comment button").addClass("disabled"),
            setTimeout(function () {
              e(".fn__chatbot .chat__item.active").append(
                '<div class="chat__box bot__chat"><div class="author"><span>VedaNex Bot</span></div><div class="chat"><frenify_typing><h3><span>Thinking...</span></h3></div></div>'
              ),
                e(".techwave_fn_intro").length
                  ? e("html, body").animate({
                      scrollTop:
                        e("#fn__chat_textarea").offset().top -
                        e(window).height() +
                        100,
                    })
                  : e("html, body").animate({
                      scrollTop: e(document).height() - e(window).height(),
                    });
            }, 100),
            setTimeout(function () {
              // Add personalized response based on user input
              var personalizedResponse = t;
              if (s.toLowerCase().includes('age') || s.toLowerCase().includes('year') || s.match(/\d+/) || s.toLowerCase().includes('male') || s.toLowerCase().includes('female')) {
                personalizedResponse = personalizedResponse.replace('</p><p><em>Referred from online Ayurvedic resources</em></p>', '</p><p><strong>Personalized Recommendation:</strong> Based on your profile, consider consulting an Ayurvedic practitioner for a customized treatment plan including proper dosage according to your age and constitution.</p><p><em>Referred from online Ayurvedic resources</em></p>');
              }
              e(
                ".fn__chatbot .chat__item.active .chat__box.bot__chat:last-child .chat"
              ).html(personalizedResponse),
                e(".fn__chat_comment button").removeClass("disabled"),
                e(".techwave_fn_intro").length
                  ? e("html, body").animate({
                      scrollTop:
                        e("#fn__chat_textarea").offset().top -
                        e(window).height() +
                        100,
                    })
                  : e("html, body").animate({
                      scrollTop: e(document).height() - e(window).height(),
                    });
            }, 2e3));
      },
      shuffleArray: function (e) {
        for (var t, a = e.length; 0 !== a; )
          (t = Math.floor(Math.random() * a)),
            a--,
            ([e[a], e[t]] = [e[t], e[a]]);
        return e;
      },
      escapeHTML: function (e) {
        var t = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
          "/": "&#x2F;",
          "`": "&#x60;",
          "=": "&#x3D;",
        };
        return String(e).replace(/[&<>"'`=\/]/g, function (e) {
          return t[e];
        });
      },
      aiChatBotOptions: function () {
        e(".fn__chat_link")
          .off()
          .on("click", function () {
            var t = e(this);
            return (
              t.hasClass("active") ||
                (e(".fn__chat_link.active").removeClass("active"),
                e(".fn__chatbot .chat__item.active").removeClass("active"),
                t.addClass("active"),
                e(t.attr("href")).addClass("active"),
                e(".fn__new_chat_link").removeClass("active"),
                e(".fn__chat_comment").removeClass("neww"),
                e(".fn__chatbot .fn__title_holder .title").text(
                  t.find(".text").text()
                ),
                "" === e(t.attr("href")).html() &&
                  e(".fn__chat_comment").addClass("neww")),
              e("#fn__chat_textarea").frenifyMoveCursorToEnd(),
              !1
            );
          }),
          e(".fn__new_chat_link")
            .off()
            .on("click", function () {
              var t = e(this);
              return (
                t.hasClass("active") ||
                  (e(".fn__chat_link.active").removeClass("active"),
                  e(".fn__chatbot .chat__item.active").removeClass("active"),
                  t.addClass("active"),
                  e(t.attr("href")).addClass("active").html(""), // Clear previous conversation content
                  (i = 0),
                  e(".fn__chatbot .fn__title_holder .title").text("New Chat")),
                e(".fn__chat_comment").addClass("neww"),
                e("#fn__chat_textarea").frenifyMoveCursorToEnd(),
                !1
              );
            }),
          e(".fn__chat_link input")
            .off()
            .on("click", function (e) {
              e.stopPropagation();
            }),
          e(".fn__chat_link .trigger")
            .off()
            .on("click", function () {
              var t = e(this).closest(".fn__chat_link");
              return (
                t.hasClass("opened")
                  ? t.removeClass("opened")
                  : t.addClass("opened"),
                !1
              );
            }),
          e(".fn__chat_link .edit")
            .off()
            .on("click", function () {
              var t = e(this).closest(".fn__chat_link"),
                a = t.find("input");
              return (
                t.addClass("live_edit").removeClass("opened"),
                (n = a.val()),
                setTimeout(function () {
                  a.frenifyMoveCursorToEnd();
                }, 100),
                !1
              );
            }),
          e(".fn__chat_link .cancel")
            .off()
            .on("click", function () {
              var t = e(this).closest(".fn__chat_link"),
                a = t.find("input");
              return t.removeClass("live_edit"), a.val(n), !1;
            }),
          e(".fn__chat_link .save")
            .off()
            .on("click", function () {
              var t = e(this).closest(".fn__chat_link"),
                a = t.find("input");
              return (
                t.removeClass("live_edit"),
                (n = a.val()),
                t.find(".text").text(n),
                !1
              );
            }),
          e(window).on("click", function () {
            e(".fn__chat_link").removeClass("opened");
          }),
          e(".fn__chat_link .options__popup").on("click", function (e) {
            e.stopPropagation();
          });
      },
      aiChatBotTextareaHeight: function () {
        e("#fn__chat_textarea").on("mouseup keyup", function () {
          var t = e(this),
            a = t.val(),
            o = t.siblings(".fn__hidden_textarea");
          o.val(a);
          var n = Math.floor((o[0].scrollHeight - 34) / 22);
          t.css({ height: 22 * n + 34 + 4 }),
            n > 6
              ? t.css({ overflowY: "auto" })
              : t.css({ overflowY: "hidden" });
        }),
          e("#fn__include_textarea").on("mouseup keyup", function () {
            var t = e(this),
              a = t.val(),
              o = t.siblings(".fn__hidden_textarea");
            o.val(a);
            var n = Math.floor((o[0].scrollHeight - 34) / 22);
            t.css({ height: 22 * n + 34 + 4 }),
              n > 6
                ? t.css({ overflowY: "auto" })
                : t.css({ overflowY: "hidden" });
          }),
          e("#fn__exclude_textarea").on("mouseup keyup", function () {
            var t = e(this),
              a = t.val(),
              o = t.siblings(".fn__hidden_textarea");
            o.val(a);
            var n = Math.floor((o[0].scrollHeight - 34) / 22);
            t.css({ height: 22 * n + 34 + 4 }),
              n > 6
                ? t.css({ overflowY: "auto" })
                : t.css({ overflowY: "hidden" });
          });
      },
      billingProgress: function () {
        e(".techwave_fn_user_billing .progress").each(function () {
          var t = e(this);
          t.waypoint({
            handler: function () {
              t.hasClass("active") ||
                setTimeout(function () {
                  t.css("--frenify-progress", t.data("percentage")),
                    t.addClass("active");
                }, 500);
            },
            offset: "90%",
          });
        });
      },
      inputFileOnChange: function () {
        e(".fn__upload").on("change", function (t) {
          var a = e(this),
            o = t.target.files[0];
          o &&
            a
              .addClass("has_img")
              .find(".preview_img")
              .attr("src", URL.createObjectURL(o));
        }),
          e(".fn__upload .fn__closer").on("click", function () {
            var t = e(this).closest(".fn__upload");
            return (
              t.removeClass("has_img"),
              t.find(".preview_img").attr("src", "#"),
              t.find('input[type="file]').val(""),
              !1
            );
          });
      },
      optionsList: function () {
        e(".fn__options_list a")
          .off()
          .on("click", function () {
            var t = e(this);
            return (
              t.hasClass("enabled")
                ? t.removeClass("enabled").addClass("disabled")
                : t.removeClass("disabled").addClass("enabled"),
              !1
            );
          });
      },
      pricingTab: function () {
        e(".techwave_fn_pricing .toggle_in").each(function () {
          var t = e(this),
            a = t.find(".active"),
            o = a.offset().left - t.offset().left;
          t.find(".bg").css({ left: o, width: a.outerWidth(!0, !0) });
        }),
          e(".techwave_fn_pricing .toggle_in a")
            .off()
            .on("click", function () {
              var t = e(this);
              if (!t.hasClass("active")) {
                var a = t.closest(".toggle_in"),
                  o = t.closest(".techwave_fn_pricing"),
                  n = t.offset().left - a.offset().left;
                o.find(".pricing__tab.active").removeClass("active"),
                  e(t.attr("href")).addClass("active"),
                  t.siblings().removeClass("active"),
                  t.addClass("active"),
                  a.find(".bg").css({ left: n, width: t.outerWidth(!0, !0) });
              }
              return !1;
            });
      },
      feedFilters: function () {
        e('.techwave_fn_feed .filter__select input[type="checkbox"]').change(
          function () {
            var t = e(this),
              a = t.is(":checked"),
              o = t.closest(".techwave_fn_feed"),
              n = o.find(".fn__gallery_items .item");
            a
              ? (n.addClass("select__ready"),
                o.find(".fn__selection_box").slideDown(200))
              : (n.removeClass("select__ready"),
                o.find(".fn__selection_box").slideUp(200));
          }
        ),
          e(".fn__selectable_item")
            .off()
            .on("click", function () {
              var a = e(this),
                o = a.closest(".techwave_fn_community_page");
              return (
                o.find(".fn__gallery_items .item"),
                a.hasClass("selected")
                  ? (a.removeClass("selected"), t--)
                  : (a.addClass("selected"), t++),
                o.find(".fn__selection_box .count").text(t),
                !1
              );
            }),
          e(".techwave_fn_feed .fn__tabs a").on("click", function () {
            var t = e(this);
            if (!t.hasClass("active") && !a) {
              (a = !0),
                t.siblings().removeClass("active"),
                t.addClass("active");
              var o = t.closest(".techwave_fn_feed");
              o.find(".feed__results").addClass("loading"),
                setTimeout(function () {
                  o.find(".feed__results").removeClass("loading"),
                    (a = !1),
                    r.galleryIsotope();
                }, 1500);
            }
            return !1;
          }),
          e(".techwave_fn_feed .filter__sorting a").on("click", function () {
            var t = e(this);
            if (!t.hasClass("enabled") && !a) {
              (a = !0),
                t.siblings().removeClass("enabled").addClass("disabled"),
                t.removeClass("disabled").addClass("enabled");
              var o = t.closest(".techwave_fn_feed");
              o.find(".feed__results").addClass("loading"),
                setTimeout(function () {
                  o.find(".feed__results").removeClass("loading"), (a = !1);
                }, 1500);
            }
            return !1;
          }),
          e(
            '.techwave_fn_feed .filter__upscaled input[type="checkbox"]'
          ).change(function () {
            var t = e(this);
            t.is(":checked");
            var a = t.closest(".techwave_fn_feed");
            a.find(".feed__results").addClass("loading"),
              setTimeout(function () {
                a.find(".feed__results").removeClass("loading");
              }, 1500);
          }),
          e(".techwave_fn_feed .filter__search a").on("click", function () {
            if (!a) {
              var t = e(this).closest(".techwave_fn_feed");
              t.find(".feed__results").addClass("loading"),
                setTimeout(function () {
                  t.find(".feed__results").removeClass("loading"), (a = !1);
                }, 1500);
            }
            return !1;
          });
      },
      report: function () {
        var t = e(".techwave_fn_report");
        e(".fn__report")
          .off()
          .on("click", function () {
            return (
              e(this).data("id"),
              t.hasClass("opened")
                ? t.removeClass("opened")
                : t.addClass("opened"),
              !1
            );
          }),
          t
            .find(".cancel")
            .off()
            .on("click", function () {
              return t.removeClass("opened"), !1;
            }),
          t
            .find(".fn__closer")
            .off()
            .on("click", function () {
              return t.removeClass("opened"), !1;
            }),
          t
            .find(".report__closer")
            .off()
            .on("click", function () {
              return t.removeClass("opened"), !1;
            });
      },
      follow: function () {
        e(".fn__follow")
          .off()
          .on("click", function () {
            var t = e(this),
              a = t.find(".text");
            return (
              t.data("id"),
              t.hasClass("has__follow")
                ? (t.removeClass("has__follow"), a.text(t.data("follow-text")))
                : (t.addClass("has__follow"), a.text(t.data("unfollow-text"))),
              !1
            );
          });
      },
      copyLink: function () {
        e(".fn__copy")
          .off()
          .on("click", function () {
            var t = e(this),
              a = t.text(),
              o = t.data("copied"),
              n = t.attr("data-text"),
              s = t.attr("href");
            void 0 !== n && !1 !== n && (s = n);
            var i = e("<input>");
            return (
              e("body").append(i),
              i.val(s).select(),
              document.execCommand("copy"),
              i.remove(),
              t
                .text(o)
                .delay(1e3)
                .queue(function (e) {
                  t.text(a), e();
                }),
              !1
            );
          });
      },
      galleryIsotope: function () {
        var t = e(".fn__gallery_items");
        e().isotope &&
          t.each(function () {
            e(this).isotope({
              percentPosition: !0,
              itemSelector: ".fn__gallery_item",
              masonry: {},
            });
          });
      },
      imageLightbox: function () {
        var t = e("body"),
          a = 0;
        e(".fn__gallery_items .item")
          .off()
          .on("click", function () {
            var n = e(this);
            return (
              n.data("id"),
              n.hasClass("select__ready") ||
                (o.scrollTop(0),
                (a = document.documentElement.style.getPropertyValue(
                  "--techwave-scroll-y"
                )),
                t.css({ position: "fixed", top: a }),
                t.addClass("fn__lightbox_mode"),
                o.addClass("opened")),
              !1
            );
          });
        var o = e(".techwave_fn_img_lightbox");
        o.find(".fn__closer")
          .off()
          .on("click", function () {
            t.removeClass("fn__lightbox_mode"),
              o.removeClass("opened"),
              t.css({ position: "relative", top: "" }),
              setTimeout(function () {
                window.scrollTo({ top: 300, left: 0, behavior: "instant" }),
                  r.galleryIsotope();
              }, 1);
          });
      },
      bookmark: function () {
        e(".fn__bookmark")
          .off()
          .on("click", function () {
            var t = e(this);
            return (
              t.hasClass("has__bookmark")
                ? t.removeClass("has__bookmark")
                : t.addClass("has__bookmark"),
              !1
            );
          });
      },
      like: function () {
        e(".fn__like")
          .off()
          .on("click", function () {
            var t = e(this),
              a = t.find(".count");
            return (
              t.data("id"),
              t.hasClass("has__like")
                ? (t.removeClass("has__like"), a.text(parseInt(a.text()) - 1))
                : (t.addClass("has__like"), a.text(parseInt(a.text()) + 1)),
              !1
            );
          });
      },
      accordion: function () {
        e(".techwave_fn_accordion").each(function () {
          e(this).find(".opened .acc__content").slideDown(300);
        }),
          e(".techwave_fn_accordion .acc__header").on("click", function () {
            var t = e(this),
              a = t.closest(".acc__item"),
              o = t.closest(".techwave_fn_accordion"),
              n = a.find(".acc__content"),
              s = o.data("type");
            a.hasClass("opened")
              ? (a.removeClass("opened"), n.slideUp(300))
              : ("accordion" === s &&
                  (o.find(".acc__item").removeClass("opened"),
                  o.find(".acc__content").slideUp(300)),
                a.addClass("opened"),
                n.slideDown(300));
          });
      },
      search: function () {
        var t = e(".techwave_fn_searchbar"),
          a = t.find(".search__input"),
          o = t.find(".search__results");
        e(".fn__nav_bar .bar__item_search .item_opener").on(
          "click",
          function () {
            return (
              t.addClass("opened"),
              setTimeout(function () {
                a[0].focus();
              }, 100),
              !1
            );
          }
        ),
          t.find(".search__closer").on("click", function () {
            return (
              a.val(""), o.removeClass("opened"), t.removeClass("opened"), !1
            );
          });
        var n = null;
        a.on("keyup", function () {
          var t = e(this).val();
          clearTimeout(n),
            (n = setTimeout(function () {
              "" === t ? o.removeClass("opened") : o.addClass("opened");
            }, 700));
        });
      },
      animatedText: function () {
        e(".fn__animated_text").each(function () {
          var t = e(this),
            a = t.text().split(""),
            o = t.data("wait");
          o || (o = 0);
          var n = t.data("speed");
          n || (n = 4),
            (n /= 100),
            t.html("<em>321...</em>").addClass("ready"),
            t.waypoint({
              handler: function () {
                t.hasClass("stop") ||
                  (t.addClass("stop"),
                  setTimeout(function () {
                    t.text(""),
                      e.each(a, function (e, a) {
                        var o = document.createElement("span");
                        (o.textContent = a),
                          (o.style.animationDelay = e * n + "s"),
                          t.append(o);
                      });
                  }, o));
              },
              offset: "90%",
            });
        });
      },
      movingSubMenuForLeftPanel: function () {
        var t = e(".techwave_fn_fixedsub"),
          a = e(".techwave_fn_leftpanel .group__list > li"),
          o = e(".techwave_fn_content");
        function n() {
          o.on("mouseenter", function () {
            t.removeClass("opened"),
              a.removeClass("hovered").parent().removeClass("hovered");
          });
        }
        a.on("mouseenter", function () {
          var o = e(this),
            s = o.children("ul.sub-menu"),
            i = s.html();
          s.length
            ? (a.removeClass("hovered"),
              o.addClass("hovered").parent().addClass("hovered"),
              t.removeClass("opened").children("ul").html("").html(i),
              t.addClass("opened"))
            : (a.removeClass("hovered"),
              t.removeClass("opened"),
              o.removeClass("hovered").parent().removeClass("hovered"));
          var r = o.offset().top,
            l = e(".techwave_fn_leftpanel .leftpanel_content").offset().top;
          t.css({ top: r - l }), n();
        }),
          n();
      },
      panelResize: function () {
        var t = e("html");
        e(".techwave_fn_leftpanel .desktop_closer")
          .off()
          .on("click", function () {
            return (
              t.hasClass("panel-opened")
                ? (t.removeClass("panel-opened"),
                  (localStorage.frenify_panel = ""))
                : (t.addClass("panel-opened"),
                  (localStorage.frenify_panel = "panel-opened")),
              !1
            );
          }),
          e(".techwave_fn_leftpanel .mobile_closer")
            .off()
            .on("click", function () {
              return (
                t.hasClass("mobile-panel-opened")
                  ? t.removeClass("mobile-panel-opened")
                  : t.addClass("mobile-panel-opened"),
                !1
              );
            });
      },
      navBarItems: function () {
        var t = e(".fn__nav_bar .bar__item_user");
        t.find(".user_opener").on("click", function (a) {
          return (
            a.stopPropagation(),
            t.hasClass("opened")
              ? t.removeClass("opened")
              : t.addClass("opened"),
            e(".bar__item_language,.bar__item_notification").removeClass(
              "opened"
            ),
            !1
          );
        }),
          t.on("click", function (e) {
            e.stopPropagation();
          }),
          e(window).on("click", function () {
            t.removeClass("opened");
          }),
          e(".fn__nav_bar .bar__item_skin .item_opener")
            .off()
            .on("click", function () {
              return (
                "light" === e("html").attr("data-techwave-skin")
                  ? (e("html").attr("data-techwave-skin", "dark"),
                    (localStorage.frenify_skin = "dark"))
                  : (e("html").attr("data-techwave-skin", "light"),
                    (localStorage.frenify_skin = "light")),
                e(
                  ".bar__item_user,.bar__item_language,.bar__item_notification"
                ).removeClass("opened"),
                !1
              );
            });
        var a = e(".fn__nav_bar .bar__item_language");
        a.find(".item_opener").on("click", function (t) {
          return (
            t.stopPropagation(),
            a.hasClass("opened")
              ? a.removeClass("opened")
              : a.addClass("opened"),
            e(".bar__item_user,.bar__item_notification").removeClass("opened"),
            !1
          );
        }),
          a.on("click", function (e) {
            e.stopPropagation();
          }),
          e(window).on("click", function () {
            a.removeClass("opened");
          });
        var o = e(".fn__nav_bar .bar__item_notification");
        o.find(".item_opener").on("click", function (t) {
          return (
            t.stopPropagation(),
            o.hasClass("opened")
              ? o.removeClass("opened")
              : o.addClass("opened"),
            e(".bar__item_user,.bar__item_language").removeClass("opened"),
            !1
          );
        }),
          o.on("click", function (e) {
            e.stopPropagation();
          }),
          e(window).on("click", function () {
            o.removeClass("opened");
          });
      },
      redetectFullScreen: function () {
        var t = e(".fn__nav_bar .bar__item_fullscreen a");
        window.innerHeight === screen.height
          ? t.addClass("full_screen")
          : t.removeClass("full_screen");
      },
      fullSCreen: function () {
        var t = e(".fn__nav_bar .bar__item_fullscreen a");
        t.off().on("click", function () {
          return (
            t.hasClass("full_screen")
              ? (t.removeClass("full_screen"),
                document.exitFullscreen
                  ? document.exitFullscreen()
                  : document.msExitFullscreen
                  ? document.msExitFullscreen()
                  : document.mozCancelFullScreen
                  ? document.mozCancelFullScreen()
                  : document.webkitExitFullscreen &&
                    document.webkitExitFullscreen())
              : (t.addClass("full_screen"),
                document.documentElement.requestFullscreen
                  ? document.documentElement.requestFullscreen()
                  : document.documentElement.msRequestFullscreen
                  ? document.documentElement.msRequestFullscreen()
                  : document.documentElement.mozRequestFullScreen
                  ? document.documentElement.mozRequestFullScreen()
                  : document.documentElement.webkitRequestFullscreen &&
                    document.documentElement.webkitRequestFullscreen(
                      Element.ALLOW_KEYBOARD_INPUT
                    )),
            !1
          );
        });
      },
      navSubMenu: function () {
        e(".techwave_fn_leftpanel .menu-item-has-children > a")
          .off()
          .on("click", function () {
            var t = e(this).closest("li");
            return (
              t.hasClass("closed")
                ? (t.removeClass("closed"), t.children("ul").slideDown(200))
                : (t.addClass("closed"), t.children("ul").slideUp(200)),
              !1
            );
          });
      },
      preloader: function () {
        var t = e(".techwave_fn_preloader"),
          a = new Date() - FrenifyTechWaveTime,
          o = 4e3;
        a < o ? (o -= a) : (o = 0),
          t.hasClass("wait_for_full_preloading_animation") || (o = 0),
          setTimeout(function () {
            t.addClass("fn_ready");
          }, o),
          setTimeout(function () {
            t.remove();
          }, o + 2e3);
      },
      imgToSVG: function () {
        e("img.fn__svg").each(function () {
          var t = e(this),
            a = t.attr("class"),
            o = t.attr("src");
          e.get(
            o,
            function (o) {
              var n = e(o).find("svg");
              void 0 !== a && (n = n.attr("class", a + " replaced-svg")),
                t.replaceWith(n);
            },
            "xml"
          );
        });
      },
      BgImg: function () {
        e("*[data-bg-img]").each(function () {
          var t = e(this),
            a = t.attr("data-bg-img"),
            o = t.data("bg-img");
          void 0 !== a && t.css({ backgroundImage: "url(" + o + ")" });
        });
      },
    };
  e(document).ready(function () {
    r.init(),
      e(":root").css("--techwave-scroll-y", -1 * window.scrollY + "px"),
      setTimeout(function () {
        r.galleryIsotope();
      }, 500);
  }),
    e(window).on("resize", function () {
      r.popupMobile(), r.redetectFullScreen(), r.galleryIsotope();
    }),
    e(window).on("load", function () {
      r.preloader(),
        r.galleryIsotope(),
        setTimeout(function () {
          r.galleryIsotope();
        }, 1e3);
    }),
    e(window).on("scroll", function () {
      e(":root").css("--techwave-scroll-y", -1 * window.scrollY + "px");
    });
})(jQuery);
