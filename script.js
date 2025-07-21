function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (message === "") return;

    appendMessage("user", message);
    input.value = "";

    const chatBox = document.getElementById("chat-box");
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "bot");
    typingDiv.innerText = "Typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
        chatBox.removeChild(typingDiv);
        const botReply = getBotResponse(message);
        typeBotMessage(botReply);
    }, 2000);
}

function appendMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function typeBotMessage(text) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "bot");
    chatBox.appendChild(messageDiv);

    let i = 0;
    const typing = setInterval(() => {
        messageDiv.textContent += text.charAt(i);
        i++;
        chatBox.scrollTop = chatBox.scrollHeight;
        if (i >= text.length) clearInterval(typing);
    }, 20);
}

function getBotResponse(message) {
    const typoFix = message.toLowerCase();
    if (typoFix.includes("fever")) {
        return `You might have an infection. Stay hydrated and rest. Paracetamol (e.g., Crocin, Dolo-650) can help reduce fever.`;
    }

    const devShoutouts = [
        "If this feels broken... Shaik Aman is probably debugging it 🛠️",
        "Shaik Aman made me, but he also made mistakes 😜",
        "Oops! I need more RAM and Shaik's attention 🧠",

    ];

    if (["hi", "hello", "hey", "hlo", "hii", "heyy"].some(word => typoFix.includes(word))) {
        return "Hey there! I'm your health helper bot. Feeling okay today?";
    }

    if (typoFix.includes("thank")) {
        return "You're most welcome! Health comes first ";
    }

    if (typoFix.includes("how are you")) {
        return "I'm coded to stay fine 😄 How about you?";
    }

    const nonHealthStuff = ["movie", "game", "music", "school"];
    for (let word of nonHealthStuff) {
        if (typoFix.includes(word)) {
            return "I'm not built for fun 😢 Only health talk here please!";
        }
    }

    if (["ok", "k", "kk","okay"].includes(typoFix)) {
        const okReplies = [
            "👍",
            "Noted. More updates coming soon, courtesy of developer Shaik Aman!",
            "Okay! Let me know if you need anything else. 😊",
            "Got it! I'm here if you need more help. ",
            "Noted. Feel free to ask related health queries",



        ];
        return okReplies[Math.floor(Math.random() * okReplies.length)];
    }


    if (["ok", "bye", "k", "goodnight", "byee", "ok bye", "k bye"].includes(typoFix)) {
        const byeReplies = [
            "Okay, take care! Ping me if something hurts.",
            "Bye! Drink water and avoid stress ",
            "Sure. I'm here when you need me again!"
        ];
        return byeReplies[Math.floor(Math.random() * byeReplies.length)];
    }


    const devQs = [
        "who made you", "developer", "created you", "who built you", "build", "build you",
    ];
    for (let keyword of devQs) {
        if (typoFix.includes(keyword)) {
            return `Shaik Aman is the mastermind behind me! Check him out here: https://shaikaman733.github.io/portfolio/`;
        }
    }


    const healthMap = {
        fever: "You might have an infection. Stay hydrated and rest. Paracetamol (e.g., Crocin, Dolo-650) can help reduce fever.",
        cold: "Cold is usually mild. Rest, drink fluids, and try a decongestant like Sinarest. Eat citrus fruits like oranges and gooseberries.",
        cough: "Cough can be due to cold or allergy. Stay hydrated. Try syrup like Benadryl or Honitus. Ginger and tulsi can help.",
        pain: "Can you tell where the pain is? For general pain, Paracetamol or Ibuprofen may help.",
        headache: "Headache can be from stress or dehydration. Drink water and rest. Use Paracetamol or Saridon. Bananas can help.",
        sore: "Gargle with warm salt water. Strepsils or Vicks lozenges can help.",
        vomiting: "That might be food-related. Rest and take light food. Ondansetron (Emeset) may help.",
        nausea: "Try ginger tea or Emeset. Avoid spicy food and rest.",
        diarrhea: "Stay hydrated. ORS can help. Eat bananas and rice.",
        constipation: "Drink water, eat fiber. Try Isabgol or a mild laxative. Eat papaya and spinach.",
        "chest pain": "Chest pain can be serious. Please consult a doctor immediately.",
        asthma: "Use your inhaler like Salbutamol. Avoid allergens or cold air.",
        allergy: "Avoid the allergen and try Cetirizine or Allegra.",
        flu: "Rest, hydrate, and use Paracetamol for fever/body ache.",
        covid: "Isolate and monitor. Take paracetamol for fever and consult a doctor.",
        dengue: "Monitor platelet count. Stay hydrated. See a doctor immediately. Eat papaya leaves juice.",
        malaria: "See a doctor for blood test. Antimalarials will be prescribed.",
        typhoid: "Needs antibiotics like Cefixime. Drink boiled water. Eat soft foods like bananas, boiled potato.",
        diabetes: "Manage with diet, exercise, and Metformin (if advised). Eat bitter gourd, fenugreek, oats.",
        hypertension: "Monitor BP and take medication regularly. Eat beetroot, banana, garlic.",
        "kidney stone": "Drink water. Painkillers can help. Consult urologist. Avoid spinach and tomatoes.",
        pcos: "Consult a gynecologist. Metformin and diet changes may help. Eat flaxseeds, green leafy veggies.",
        anemia: "Iron-rich food and supplements like Ferrous Sulfate help. Eat spinach, dates, pomegranate.",
        depression: "Mental health matters. Therapy and SSRIs like Fluoxetine may help. Eat nuts, bananas, and berries.",
        anxiety: "Deep breathing helps. For severe anxiety, consult a professional. Chamomile tea may help.",
        eczema: "Use moisturizers. Avoid allergens. Hydrocortisone may help.",
        psoriasis: "Use medicated creams. Light therapy is also used.",
        tuberculosis: "Needs long treatment. See a doctor for DOTS/NTEP.",
        arthritis: "Anti-inflammatories and physiotherapy are recommended. Omega-3 from flaxseeds can help.",
        cancer: "Early detection is key. See a specialist for proper care.",
        jaundice: "Avoid fatty food. Get liver function tests. Eat sugarcane juice, radish.",
        stroke: "Sudden numbness or slurred speech—call emergency immediately.",
        migraine: "Use Paracetamol or Sumatriptan. Rest in a dark quiet place.",
        pneumonia: "Fever, chest pain, and cough. Antibiotics may help.",
        uti: "Burning urination. Drink water. Antibiotics may be required. Drink cranberry juice.",
        thyroid: "TSH test recommended. Thyroxine is used in hypothyroidism. Eat iodized salt, eggs.",
        acidity: "Causes heartburn. Try antacids like Gelusil. Eat banana, fennel seeds.",
        gas: "Avoid fried food. Light meals, Digene may help. Ajwain (carom seeds) are good.",
        indigestion: "Try light meals and antacids. Domperidone or Pantoprazole may help.",
        "weight loss": "Ensure balanced diet. Eat peanut butter, banana shakes, potatoes.",
        "weight gain": "Eat calorie-rich healthy food. Avoid thyroid/hormone issues.",
        weakness: "Could be low hemoglobin. Eat eggs, paneer, bananas, and dry fruits.",
        fatigue: "May be due to stress. Rest, and eat green leafy vegetables.",
        "eye pain": "Eye strain is common. Use lubricating drops. Rest eyes from screens.",
        "ear pain": "Could be infection. Warm compress. Consult if severe.",
        "toothache": "Rinse with salt water. Use clove oil. Painkillers help.",
        "back pain": "Use heating pad. Rest. Ibuprofen helps. Stretching helps long-term.",
        insomnia: "Avoid screens. Use warm milk or chamomile tea. Melatonin may help.",
        "period pain": "Use hot water bags and take Mefenamic Acid (Meftal Spas).",
        "mouth ulcer": "Apply Zytee or Dologel. Avoid spicy food. B-complex may help.",
        "itching": "Try Candid powder or antihistamines. Could be allergy or fungal.",
        "hair fall": "Use mild shampoo. Biotin, amla, and curry leaves are helpful.",
        "dandruff": "Use Ketoconazole shampoo (Nizoral). Neem rinse may help.",
        "skin dryness": "Apply moisturizers. Avoid hot water. Use coconut oil.",
        piles: "Use Anovate cream. Eat more fiber. Drink water. Eat figs.",
        "burning urination": "Drink water. Likely UTI. Consult for antibiotics.",
        "frequent urination": "Could be diabetes. Test sugar and urine.",
        sneezing: "Use Cetirizine. Avoid allergens. Steam may help.",
        hiccups: "Hold breath. Sip cold water slowly. Usually harmless.",
        dehydration: "Drink ORS or lemon water. Eat watermelon, cucumber.",
        shivering: "Use warm blankets. May be fever onset.",
        breathlessness: "Check oxygen level. Could be asthma/COVID. Seek help.",
        "muscle cramps": "Stretch and hydrate. Magnesium helps. Banana is good.",
        "nosebleed": "Lean forward, pinch nose. Ice pack helps. If frequent, see doctor."

    };

    for (let keyword in healthMap) {
        if (typoFix.includes(keyword)) {
            return healthMap[keyword];
        }
    }

    const genericResponses = [
        "Can you describe your symptoms more clearly?",
        "I’m here to help you feel better. What's going on?",
        "That sounds important. Let’s try to understand it.",
        "I care about your health. Tell me more.",
        "Try resting, drinking water, and tell me how you feel after."
    ];
    const randomGeneric = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    const randomDev = devShoutouts[Math.floor(Math.random() * devShoutouts.length)];
    const addDevLine = Math.random() < 0.3;

    return addDevLine ? `${randomGeneric}\n\n${randomDev}` : randomGeneric;
}

window.onload = () => {


    const introMessage = "Hi, I was developed by Shaik Aman to help you with basic medical suggestions. How are you feeling today?";
    typeBotMessage(introMessage);
};


document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
