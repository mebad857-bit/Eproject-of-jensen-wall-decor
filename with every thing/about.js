$(document).ready(function () {

  $("#exploreBtn").on("click", function () {
    let name = prompt("👋 Welcome! What’s your name?");

    if (!name) {
      alert("Hello Guest! Welcome to our professional wall décor website.");
      return;
    }

    let wantsSuggestions = confirm(
      "Hi " + name + "! 🌟 Would you like to see our special suggestions?"
    );

    if (wantsSuggestions) {
      let categories = [
        "Metal Wall Art",
        "Wallpapers",
        "Photo Frame Art",
        "Mirrors",
        "Wall shelves",
        "Wall Mounted Animal"
      ];

      let message = "Here are our top categories for you, " + name + ":\n\n";
      $.each(categories, function (i, category) {
        message += (i + 1) + ". " + category + "\n";
      });

      alert(message);
    } else {
      alert("No worries " + name + "! 🎉 Explore freely and discover your style.");
    }
  });


  $("#ecoBtn").on("click", function () {
    let name = prompt("🌱 Welcome! What's your name?");

    if (name) {
      let choice = confirm("Hi " + name + "! Would you like to explore the eco-friendly practices we follow?");

      if (choice) {
        let categories = [
          "♻️ Recyclable Materials",
          "🗑️ Waste Reduction",
          "⚡ Energy Efficient Processes",
          "🤝 Ethical Sourcing"
        ];

        let message = "🌿 Our Sustainability Practices:\n\n";
        $.each(categories, function (i, category) {
          message += (i + 1) + ". " + category + "\n";
        });

        alert(message);
      } else {
        alert("✨ Thank you, " + name + "! Explore our sustainable practices at your own pace.");
      }
    } else {
      alert("No worries! You can still explore our green initiatives 🌍");
    }
  });


  $("#testimonialBtn").on("click", function () {
    let name = prompt("💬 What's your name?");
    if (name) {
      let feedback = prompt("Thanks, " + name + "! Please share your feedback:");
      if (feedback) {
        alert("✅ Thank you, " + name + "! Your review has been Recoded.");
      } else {
        alert("⚠️ You didn't write anything, but thanks for visiting!");
      }
    } else {
      alert("😊 No problem! Enjoy reading our customer stories.");
    }
  });

  
  $("#ctaExploreBtn").on("click", function () {
    alert("🛒 Taking you to our Product Collection…");
  });

  $("#ctaContactBtn").on("click", function () {
    alert("📧 Taking you to the Contact Us page…");
  });
});
