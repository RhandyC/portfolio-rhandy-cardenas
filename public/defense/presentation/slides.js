/* Content of the PhD defense: introduction, fundamentals and state
   of the art, the method (C1 to C3, each illustrated by its animations), the validation (C4), conclusion.
   type: title | agenda | outline | section | content (default) | video | bridge | thanks | bindex
   c: contributions shown in the header
   cite: references at the foot of the slide (keys of BIB) · th: step of the guiding thread of its section
   time: planned seconds (presenter view) · backups: links to appendix slides
   video.parts: [start (s), title]; a part stops on the frame before the next start. */
(function () {
  "use strict";
  const A = "../../videos/defense/";        // animations of the defense page
  const V = "video/";                       // use-case videos
  const F = "fig/";
  const fig = (src, alt, h) => `<div class="fig" style="${h ? `height:${h}px` : "flex:1 1 0"}"><img src="${F}${src}" alt="${alt}"></div>`;
  const go = (id, text) => `<a class="go" data-go="${id}" href="#/${id}">${text}</a>`;
  const Uens = (s = "S") => `<i>U</i><sub>ens</sub>(<i>${s}</i>)`;
  const Aens = (s = "s") => `<i>A</i><sub>ens</sub>(<i>${s}</i>)`;
  // in-text citation, as in an article: talk.js writes its number, [n]
  const R = (...k) => `<cite class="cref" data-k="${k.join(",")}"></cite>`;

  // references, IEEE style, from the manuscript's bibliography: [foot of a slide, full reference]
  const BIB = {
    "11097482": ["R. Cardenas et al., “ODD-Based Long-Term Decision-Making for Intelligent Vehicles,” <i>IEEE IV</i>, 2025.", "R. Cardenas, L. Adouane, C. Zinoune, and M.-A. Benloucif, “ODD-Based Long-Term Decision-Making for Intelligent Vehicles,” in <i>Proc. IEEE Intelligent Vehicles Symposium (IV)</i>, 2025, pp. 1215–1221."],
    "AVSC2021BehavioralCompetencies": ["AVSC, <i>Evaluation of behavioral competencies for ADS-DVs</i>, Best Practice AVSC00008202111, 2021.", "Automated Vehicle Safety Consortium, <i>AVSC Best Practice for Evaluation of Behavioral Competencies for Automated Driving System Dedicated Vehicles (ADS-DVs)</i>, SAE Industry Technologies Consortia, Best Practice AVSC00008202111, 2021."],
    "CARDENAS2025162": ["R. Cardenas et al., “Assessing the Decisional Capability for an ODD-Compliant Automatic Lane Change System via Sense-Think-Act Paradigm,” <i>IFAC-PapersOnLine</i>, 2025.", "R. Cardenas, L. Adouane, C. Zinoune, and M.-A. Benloucif, “Assessing the Decisional Capability for an ODD-Compliant Automatic Lane Change System via Sense-Think-Act Paradigm,” <i>IFAC-PapersOnLine</i>, vol. 59, no. 3, pp. 162–167, 2025."],
    "Farah2021Awareness": ["H. Farah et al., “An Empirical Analysis to Assess the Operational Design Domain of Lane Keeping System Equipped Vehicles Combining Objective and Subjective Risk Measures,” <i>IEEE T-ITS</i>, 2021.", "H. Farah et al., “An Empirical Analysis to Assess the Operational Design Domain of Lane Keeping System Equipped Vehicles Combining Objective and Subjective Risk Measures,” <i>IEEE Transactions on Intelligent Transportation Systems</i>, vol. 22, no. 5, pp. 2589–2598, 2021."],
    "WANG2021surrogate": ["C. Wang et al., “A review of surrogate safety measures and their applications in connected and automated vehicles safety modeling,” <i>Accid. Anal. Prev.</i>, 2021.", "C. Wang, Y. Xie, H. Huang, and P. Liu, “A review of surrogate safety measures and their applications in connected and automated vehicles safety modeling,” <i>Accident Analysis & Prevention</i>, vol. 157, Art. no. 106157, 2021."],
    "alshiekh2018shielding": ["M. Alshiekh et al., “Safe Reinforcement Learning via Shielding,” <i>AAAI</i>, 2018.", "M. Alshiekh, R. Bloem, R. Ehlers, B. Könighofer, S. Niekum, and U. Topcu, “Safe Reinforcement Learning via Shielding,” in <i>Proc. AAAI Conference on Artificial Intelligence</i>, 2018, pp. 2669–2678."],
    "armand2014ontology": ["A. Armand et al., “Ontology-based context awareness for driving assistance systems,” <i>IEEE IV</i>, 2014.", "A. Armand, D. Filliat, and J. Ibañez-Guzman, “Ontology-based context awareness for driving assistance systems,” in <i>Proc. IEEE Intelligent Vehicles Symposium</i>, 2014, pp. 227–233."],
    "auer2002finite": ["P. Auer et al., “Finite-time Analysis of the Multiarmed Bandit Problem,” <i>Mach. Learn.</i>, 2002.", "P. Auer, N. Cesa-Bianchi, and P. Fischer, “Finite-time Analysis of the Multiarmed Bandit Problem,” <i>Machine Learning</i>, vol. 47, pp. 235–256, 2002."],
    "avizienis2004taxonomy": ["A. Avizienis et al., “Basic concepts and taxonomy of dependable and secure computing,” <i>IEEE TDSC</i>, 2004.", "A. Avizienis, J.-C. Laprie, B. Randell, and C. Landwehr, “Basic concepts and taxonomy of dependable and secure computing,” <i>IEEE Transactions on Dependable and Secure Computing</i>, vol. 1, no. 1, pp. 11–33, 2004."],
    "bellman1957MDP": ["R. Bellman, “A markovian decision process,” <i>J. Math. Mech.</i>, 1957.", "R. Bellman, “A markovian decision process,” <i>Journal of Mathematics and Mechanics</i>, vol. 6, no. 5, pp. 679–684, 1957."],
    "bellman1957dynamic": ["R. Bellman, <i>Dynamic Programming</i>. Princeton University Press, 1957.", "R. Bellman, <i>Dynamic Programming</i>. Princeton University Press, 1957."],
    "bussemaker2014SensingRF": ["K. J. Bussemaker, “Sensing requirements for an automated vehicle for highway and rural environments,” Master's thesis, TU Delft, 2014.", "K. J. Bussemaker, “Sensing requirements for an automated vehicle for highway and rural environments,” Master's thesis, TU Delft, 2014."],
    "cardenas2025context_aware": ["R. Cardenas et al., “Context-Aware and Reliable Long-Term Decision-Making for Safe Intelligent Vehicles: A Survey,” <i>IEEE T-IV</i>, 2025.", "R. Cardenas, L. Adouane, C. Zinoune, and M.-A. Benloucif, “Context-Aware and Reliable Long-Term Decision-Making for Safe Intelligent Vehicles: A Survey,” <i>IEEE Transactions on Intelligent Vehicles</i>, vol. 10, no. 12, pp. 5288–5307, 2025."],
    "charmet2024monitoring": ["T. Charmet et al., “Operational Design Domain Monitoring with Uncertain Measurements,” <i>IEEE ITSC</i>, 2024.", "T. Charmet, V. Cherfaoui, J. Ibañez-Guzman, and A. Armand, “Operational Design Domain Monitoring with Uncertain Measurements,” in <i>Proc. IEEE 27th International Conference on Intelligent Transportation Systems (ITSC)</i>, 2024, pp. 1023–1030."],
    "chen2025intention": ["Y. Chen et al., “Intention-Guided Heuristic Partially Observable Monte Carlo Planning for Off-Ramp Decision-Making of Autonomous Vehicles,” <i>IEEE T-ITS</i>, 2025.", "Y. Chen, G. Yan, H. Yu, and J. Xi, “Intention-Guided Heuristic Partially Observable Monte Carlo Planning for Off-Ramp Decision-Making of Autonomous Vehicles,” <i>IEEE Transactions on Intelligent Transportation Systems</i>, vol. 26, no. 7, pp. 10834–10849, 2025."],
    "colwell_automated_2018": ["I. Colwell et al., “An Automated Vehicle Safety Concept Based on Runtime Restriction of the Operational Design Domain,” <i>IEEE IV</i>, 2018.", "I. Colwell, B. Phan, S. Saleem, R. Salay, and K. Czarnecki, “An Automated Vehicle Safety Concept Based on Runtime Restriction of the Operational Design Domain,” in <i>Proc. IEEE Intelligent Vehicles Symposium (IV)</i>, 2018, pp. 1910–1917."],
    "czarnecki2018operational": ["K. Czarnecki, “Operational Design Domain for Automated Driving Systems: Taxonomy of Basic Terms,” <i>WISE Lab, Univ. of Waterloo</i>, 2018.", "K. Czarnecki, “Operational Design Domain for Automated Driving Systems: Taxonomy of Basic Terms,” <i>Waterloo Intelligent Systems Engineering (WISE) Lab, University of Waterloo, Canada</i>, 2018."],
    "donges2015behaviormodels": ["E. Donges, “Driver Behavior Models,” in <i>Handbook of Driver Assistance Systems</i>, 2014.", "E. Donges, “Driver Behavior Models,” in <i>Handbook of Driver Assistance Systems: Basic Information, Components and Systems for Active Safety and Comfort</i>. Springer International Publishing, 2014, pp. 1–12."],
    "fail2022Stolte": ["T. Stolte et al., “Taxonomy to Unify Fault Tolerance Regimes for Automotive Systems: Defining Fail-Operational, Fail-Degraded, and Fail-Safe,” <i>IEEE T-IV</i>, 2022.", "T. Stolte et al., “Taxonomy to Unify Fault Tolerance Regimes for Automotive Systems: Defining Fail-Operational, Fail-Degraded, and Fail-Safe,” <i>IEEE Transactions on Intelligent Vehicles</i>, vol. 7, no. 2, pp. 251–262, 2022."],
    "fiedler2022hybrid": ["J. Fiedler et al., “A Hybrid Tactical Decision-Making Approach in Automated Driving Combining Knowledge-Based Systems and Reinforcement Learning,” <i>IEEE ITSC</i>, 2022.", "J. Fiedler, M. Gerwien, and C. Knoll, “A Hybrid Tactical Decision-Making Approach in Automated Driving Combining Knowledge-Based Systems and Reinforcement Learning,” in <i>Proc. IEEE 25th ITSC</i>, 2022, pp. 3478–3483."],
    "glaser2010ttctiv": ["S. Glaser et al., “Maneuver-Based Trajectory Planning for Highly Autonomous Vehicles on Real Road With Traffic and Driver Interaction,” <i>IEEE T-ITS</i>, 2010.", "S. Glaser, B. Vanholme, S. Mammar, D. Gruyer, and L. Nouvelière, “Maneuver-Based Trajectory Planning for Highly Autonomous Vehicles on Real Road With Traffic and Driver Interaction,” <i>IEEE Transactions on Intelligent Transportation Systems</i>, vol. 11, no. 3, pp. 589–606, 2010."],
    "hang2021gametheoric": ["P. Hang et al., “Human-Like Decision Making for Autonomous Driving: A Noncooperative Game Theoretic Approach,” <i>IEEE T-ITS</i>, 2021.", "P. Hang, C. Lv, Y. Xing, C. Huang, and Z. Hu, “Human-Like Decision Making for Autonomous Driving: A Noncooperative Game Theoretic Approach,” <i>IEEE T-ITS</i>, vol. 22, no. 4, pp. 2076–2087, 2021."],
    "hasuo2022rss": ["I. Hasuo, “Responsibility-Sensitive Safety: an Introduction with an Eye to Logical Foundations and Formalization,” <i>arXiv</i>, 2022.", "I. Hasuo, “Responsibility-Sensitive Safety: an Introduction with an Eye to Logical Foundations and Formalization,” <i>arXiv preprint</i>, 2022."],
    "hoel2019combiningdeep": ["C. Hoel et al., “Combining Planning and Deep Reinforcement Learning in Tactical Decision Making for Autonomous Driving,” <i>IEEE T-IV</i>, 2020.", "C. Hoel, K. Driggs-Campbell, K. Wolff, L. Laine, and M. J. Kochenderfer, “Combining Planning and Deep Reinforcement Learning in Tactical Decision Making for Autonomous Driving,” <i>IEEE Transactions on Intelligent Vehicles</i>, vol. 5, no. 2, pp. 294–305, 2020."],
    "hubmann2018uncertainty": ["C. Hubmann et al., “Automated Driving in Uncertain Environments: Planning With Interaction and Uncertain Maneuver Prediction,” <i>IEEE T-IV</i>, 2018.", "C. Hubmann, J. Schulz, M. Becker, D. Althoff, and C. Stiller, “Automated Driving in Uncertain Environments: Planning With Interaction and Uncertain Maneuver Prediction,” <i>IEEE Transactions on Intelligent Vehicles</i>, vol. 3, no. 1, pp. 5–17, 2018."],
    "hullermeier2021aleatoric": ["E. Hüllermeier and W. Waegeman, “Aleatoric and epistemic uncertainty in machine learning: an introduction to concepts and methods,” <i>Mach. Learn.</i>, 2021.", "E. Hüllermeier and W. Waegeman, “Aleatoric and epistemic uncertainty in machine learning: an introduction to concepts and methods,” <i>Machine Learning</i>, vol. 110, pp. 457–506, 2021."],
    "ipgCarMaker": ["IPG Automotive, “CarMaker 13.0.1,” 2024.", "IPG Automotive, “CarMaker 13.0.1,” 2024."],
    "iso2018iso26262": ["ISO, <i>ISO 26262</i>, 2018.", "ISO, <i>Road Vehicles—Functional Safety</i>, ISO 26262, 2018."],
    "iso2020iso4804": ["ISO, <i>ISO/TR 4804</i>, 2020.", "ISO, <i>Road vehicles — Safety and cybersecurity for automated driving systems — Design, verification and validation</i>, ISO/TR 4804, 2020."],
    "iso2023iso34503": ["ISO, <i>ISO 34503</i>, 2023.", "ISO, <i>Road Vehicles—Test Scenarios for Automated Driving Systems—Specification for Operational Design Domain</i>, ISO 34503, 2023."],
    "jatzkowski2021knowledge": ["I. Jatzkowski et al., “A Knowledge-based Approach for the Automatic Construction of Skill Graphs for Online Monitoring,” <i>IEEE IV</i>, 2021.", "I. Jatzkowski, T. Menzel, A. Bock, and M. Maurer, “A Knowledge-based Approach for the Automatic Construction of Skill Graphs for Online Monitoring,” in <i>Proc. IEEE Intelligent Vehicles Symposium (IV)</i>, 2021, pp. 142–149."],
    "krajewski2018highd": ["R. Krajewski et al., “The highD Dataset: A Drone Dataset of Naturalistic Vehicle Trajectories on German Highways for Validation of Highly Automated Driving Systems,” <i>IEEE ITSC</i>, 2018.", "R. Krajewski, J. Bock, L. Kloeker, and L. Eckstein, “The highD Dataset: A Drone Dataset of Naturalistic Vehicle Trajectories on German Highways for Validation of Highly Automated Driving Systems,” in <i>Proc. IEEE International Conference on Intelligent Transportation Systems (ITSC)</i>, 2018, pp. 2118–2125."],
    "krasowski2020safe": ["H. Krasowski et al., “Safe Reinforcement Learning for Autonomous Lane Changing Using Set-Based Prediction,” <i>IEEE ITSC</i>, 2020.", "H. Krasowski, X. Wang, and M. Althoff, “Safe Reinforcement Learning for Autonomous Lane Changing Using Set-Based Prediction,” in <i>Proc. IEEE International Conference on Intelligent Transportation Systems (ITSC)</i>, 2020, pp. 1–7."],
    "kuehn2017takeover": ["M. Kuehn et al., “Takeover Times in Highly Automated Driving (Level 3),” <i>ESV</i>, 2017.", "M. Kuehn, T. Vogelpohl, and M. Vollrath, “Takeover Times in Highly Automated Driving (Level 3),” in <i>Proc. 25th International Technical Conference on the Enhanced Safety of Vehicles (ESV)</i>, 2017."],
    "kuhn2021introspective": ["C. Kuhn et al., “Introspective Failure Prediction for Autonomous Driving Using Late Fusion of State and Camera Information,” <i>IEEE T-ITS</i>, 2021.", "C. Kuhn, M. Hofbauer, G. Petrovic, and E. Steinbach, “Introspective Failure Prediction for Autonomous Driving Using Late Fusion of State and Camera Information,” <i>IEEE Transactions on Intelligent Transportation Systems</i>, vol. 22, 2021."],
    "mercedes2019drivepilot": ["Mercedes-Benz, “Introducing DRIVE PILOT: An Automated Driving System for the Highway,” 2023.", "Mercedes-Benz, “Introducing DRIVE PILOT: An Automated Driving System for the Highway,” Voluntary Safety Self-Assessment, 2023. [Online]. Available: group.mercedes-benz.com"],
    "michon1985critical": ["J. A. Michon, “A Critical View of Driver Behavior Models: What Do We Know, What Should We Do?,” in <i>Human Behavior and Traffic Safety</i>, 1985.", "J. A. Michon, “A Critical View of Driver Behavior Models: What Do We Know, What Should We Do?,” in <i>Human Behavior and Traffic Safety</i>. Springer US, 1985, pp. 485–524."],
    "murphy2012machine": ["K. P. Murphy, <i>Machine Learning: A Probabilistic Perspective</i>. MIT Press, 2012.", "K. P. Murphy, <i>Machine Learning: A Probabilistic Perspective</i>. MIT Press, 2012."],
    "olsson2016BT": ["M. Olsson, “Behavior Trees for decision-making in Autonomous Driving,” Master's thesis, KTH Royal Institute of Technology, 2016.", "M. Olsson, “Behavior Trees for decision-making in Autonomous Driving,” Master's thesis, KTH Royal Institute of Technology, 2016."],
    "pior2020behaviorbased": ["P. F. Orzechowski et al., “Decision-Making for Automated Vehicles Using a Hierarchical Behavior-Based Arbitration Scheme,” <i>IEEE IV</i>, 2020.", "P. F. Orzechowski, C. Burger, and M. Lauer, “Decision-Making for Automated Vehicles Using a Hierarchical Behavior-Based Arbitration Scheme,” in <i>Proc. IEEE IV Symposium</i>, 2020, pp. 767–774."],
    "rabiee2023introspective": ["S. Rabiee and J. Biswas, “Introspective Perception for Mobile Robots,” <i>Artif. Intell.</i>, 2023.", "S. Rabiee and J. Biswas, “Introspective Perception for Mobile Robots,” <i>Artificial Intelligence</i>, vol. 324, Art. no. 103999, 2023."],
    "ref_claim_GM": ["“Look, Ma. No Pedals & No Steering Wheel! Autonomous Car Coming From GM in 2019,” <i>Forbes</i>, 2018.", "“Look, Ma. No Pedals & No Steering Wheel! Autonomous Car Coming From GM in 2019,” <i>Forbes</i>, 2018."],
    "ref_claim_Nissan": ["“Nissan Announces Unprecedented Autonomous Drive Benchmarks,” <i>Nissan Motor Co. News</i>, 2013.", "“Nissan Announces Unprecedented Autonomous Drive Benchmarks,” <i>Nissan Motor Co. News</i>, 2013."],
    "ref_claim_toyota": ["“Toyota Aims to Make Self-Driving Cars by 2020,” <i>The Wall Street Journal</i>, 2015.", "“Toyota Aims to Make Self-Driving Cars by 2020,” <i>The Wall Street Journal</i>, 2015."],
    "renault2022cta": ["F. Deca and D. Rosain-Boussiquet, “Centre technique d'Aubevoye : 40 ans d'histoire(s) et de passion automobile,” <i>Renault Group Magazine</i>, 2022.", "F. Deca and D. Rosain-Boussiquet, “Centre technique d'Aubevoye : 40 ans d'histoire(s) et de passion automobile,” <i>Renault Group Magazine</i>, 2022."],
    "reschka2015ability": ["A. Reschka et al., “Ability and skill graphs for system modeling, online monitoring, and decision support for vehicle guidance systems,” <i>IEEE IV</i>, 2015.", "A. Reschka, G. Bagschik, S. Ulbrich, M. Nolte, and M. Maurer, “Ability and skill graphs for system modeling, online monitoring, and decision support for vehicle guidance systems,” in <i>Proc. IEEE Intelligent Vehicles Symposium (IV)</i>, 2015, pp. 933–939."],
    "nhtsa2021odd": ["E. Thorn et al., “A Framework for Automated Driving System Testable Cases and Scenarios,” <i>NHTSA</i>, 2018.", "E. Thorn, S. C. Kimmel and M. Chaka, “A Framework for Automated Driving System Testable Cases and Scenarios,” <i>National Highway Traffic Safety Administration (NHTSA)</i>, DOT HS 812 623, 2018."],
    "sae2021taxonomy": ["SAE International, <i>SAE J3016</i>, 2021.", "SAE International, <i>Taxonomy and Definitions for Terms Related to Driving Automation Systems for On-Road Motor Vehicles</i>, SAE Standard J3016_202104, 2021."],
    "salvi2022fuzzy": ["A. Salvi et al., “Fuzzy Interpretation of Operational Design Domains in Autonomous Driving,” <i>IEEE IV</i>, 2022.", "A. Salvi, G. Weiss, M. Trapp, F. Oboril, and C. Buerkle, “Fuzzy Interpretation of Operational Design Domains in Autonomous Driving,” in <i>Proc. IEEE Intelligent Vehicles Symposium (IV)</i>, 2022, pp. 1261–1267."],
    "schlatow2017selfawareness": ["J. Schlatow et al., “Self-awareness in autonomous automotive systems,” <i>DATE</i>, 2017.", "J. Schlatow et al., “Self-awareness in autonomous automotive systems,” in <i>Proc. Design, Automation & Test in Europe Conference & Exhibition (DATE)</i>, 2017, pp. 1050–1055."],
    "shwartz2017RSS": ["S. Shalev-Shwartz et al., “On a Formal Model of Safe and Scalable Self-driving Cars,” <i>arXiv</i>, 2017.", "S. Shalev-Shwartz, S. Shammah, and A. Shashua, “On a Formal Model of Safe and Scalable Self-driving Cars,” <i>arXiv preprint</i> arXiv:1708.06374, 2017."],
    "silver_monte-carlo_2010": ["D. Silver and J. Veness, “Monte-Carlo Planning in Large POMDPs,” <i>NeurIPS</i>, 2010.", "D. Silver and J. Veness, “Monte-Carlo Planning in Large POMDPs,” in <i>Advances in Neural Information Processing Systems</i>, 2010."],
    "sun2022operational": ["C. Sun, “Operational Design Domain Monitoring and Augmentation for Autonomous Driving,” Ph.D. dissertation, Univ. of Waterloo, 2022.", "C. Sun, “Operational Design Domain Monitoring and Augmentation for Autonomous Driving,” Ph.D. dissertation, Univ. of Waterloo, 2022."],
    "ulbrich2015pomdp": ["S. Ulbrich and M. Maurer, “Towards Tactical Lane Change Behavior Planning for Automated Vehicles,” <i>IEEE ITSC</i>, 2015.", "S. Ulbrich and M. Maurer, “Towards Tactical Lane Change Behavior Planning for Automated Vehicles,” in <i>Proc. IEEE 18th International Conference on Intelligent Transportation Systems</i>, 2015, pp. 989–995."],
    "woerter2021enhanced": ["F. Woerter et al., “Enhanced system awareness as basis for resilience of autonomous vehicles,” <i>CARS</i>, 2021.", "F. Woerter, A. Kreutz, A. Salvi, M. Dreiser, and G. Weiss, “Enhanced system awareness as basis for resilience of autonomous vehicles,” in <i>Proc. CARS 2021 6th International Workshop on Critical Automotive Applications: Robustness & Safety</i>, 2021."],
    "zhang2020efficient": ["L. Zhang et al., “Efficient Uncertainty-aware Decision-making for Automated Driving Using Guided Branching,” <i>IEEE ICRA</i>, 2020.", "L. Zhang, W. Ding, J. Chen, and S. Shen, “Efficient Uncertainty-aware Decision-making for Automated Driving Using Guided Branching,” in <i>Proc. IEEE International Conference on Robotics and Automation (ICRA)</i>, 2020, pp. 3291–3297."],
  };

  // Structure of the defense: the introduction, the fundamentals and the state of the art, the method
  // (C1 to C3, each illustrated by its animations), the validation (C4), the conclusions and perspectives.
  // The defense stands on its own: no chapter or section of the manuscript is named.
  // toc: the title shown in the agenda · ch: the contribution
  const sections = [
    { id: "intro", short: "Intro", n: 1, page: "sec-intro", kicker: "Introduction", title: "Introduction", toc: "Introduction",
      ch: "Introduction",
      thread: ["The ODD", "Monitored, not decided", "The problem", "The idea", "The aim", "The contributions"],
      sub: "As conditions change, can the vehicle keep deciding safely?" },
    { id: "sota", short: "State of the art", n: 2, page: "sec-sota", kicker: "State of the art", title: "State of the art", toc: "State of the art",
      ch: "State of the art",
      sub: "How is the decision taken today, and where is the ODD?" },
    { id: "c1", short: "Capability", n: 3, page: "sec-c1", kicker: "Decisional capability", title: "Decisional capability", toc: "Decisional capability",
      ch: "Decisional capability", c: ["C1"], pubs: ["IFAC IAV 2025"], pubk: "CARDENAS2025162",
      sub: "What can the vehicle still ensure?" },
    { id: "c2", short: "ODD-MDP", n: 4, page: "sec-c2", kicker: "ODD-MDP", title: "ODD-MDP", toc: "ODD-MDP",
      ch: "ODD-MDP", c: ["C2"], pubs: ["IEEE IV 2025"], pubk: "11097482",
      sub: "Which sequence of ensured maneuvers to choose?" },
    { id: "c3", short: "ODD-POMDP", n: 5, page: "sec-c3", kicker: "ODD-POMDP", title: "ODD-POMDP", toc: "ODD-POMDP",
      ch: "ODD-POMDP", c: ["C3"],
      sub: "What if the information is uncertain?" },
    { id: "c4", short: "Validation", n: 6, page: "sec-c4", kicker: "Validation", title: "Validation", toc: "Validation",
      ch: "Validation", c: ["C4"],
      sub: "Does it hold, in simulation and on a real vehicle?" },
    { id: "concl", short: "Conclusion", n: 7, page: "sec-concl", kicker: "Conclusion", title: "Conclusions and perspectives", toc: "Conclusions and perspectives",
      ch: "Conclusion",
      sub: "Contributions, evidence, limitations and future directions" },
  ];

  const jury = [   // as on the official defense poster (Affiche, UTC doctoral school)
    ["Reviewer", "Lydie Nouvelière", "Université Jean Monnet, Télécom <span class='nw'>Saint-Étienne</span>"],
    ["Reviewer", "Fawzi Nashashibi", "Inria Paris"],
    ["Examiner", "Philippe Bonnifait", "Université de technologie de Compiègne, Heudiasyc"],
    ["Examiner", "David Filliat", "Institut Polytechnique de Paris, AMIAD"],
    ["Examiner", "Jean-Christophe Popieul", "Université Polytechnique <span class='nw'>Hauts-de-France</span>, LAMIH"],
    ["Thesis director", "Lounis Adouane", "Université de technologie de Compiègne, Heudiasyc UMR CNRS 7253"],
    ["Co-supervisor", "Clément Zinoune", "Renault Group, Ampère"],
    ["Co-supervisor", "Mohamed-Amir Benloucif", "Renault Group, Ampère"],
  ];

  const slides = [
    // ================================================================ opening
    { id: "title", type: "title", title: "Fail-operational decision-making for intelligent vehicles", time: 30,
      notes: "Good morning. Thank you to the members of the jury for being here, and in particular to the two reviewers. This thesis was carried out under a CIFRE agreement between Heudiasyc at UTC and Ampère, Renault Group. Its question: how can a vehicle keep taking correct decisions while its operating conditions change.",
      html: `<div class="ttl"><div class="left"><div class="main"><div class="lbl">Doctoral thesis defense</div>
        <h1>Fail-operational decision-making for intelligent vehicles</h1><div class="rule"></div>
        <div class="author">Rhandy Cardenas</div>
        <div class="aff">Heudiasyc, UMR CNRS 7253 · Université de technologie de Compiègne<br>Renault Group, Ampère</div>
        <div class="date">1 December 2026 · Centre d’innovation, Compiègne</div></div>
        <div class="logos"><img class="hds" src="${F}logo_heudiasyc.png" alt="Heudiasyc"><img class="utc" src="${F}logo_utc.png" alt="Université de technologie de Compiègne"><img class="cnrs" src="${F}logo_cnrs.png" alt="CNRS"><img class="rg" src="${F}logo_renault.png" alt="Renault Group"></div></div>
        <div class="jury"><h2>JURY</h2>${jury.map(([r, n, a]) => `<div class="p"><div class="r">${r}</div><div><div class="n">${n}</div><div class="a">${a}</div></div></div>`).join("")}</div></div>` },

    { id: "agenda", type: "agenda", kicker: "Outline of the defense", time: 40,
      title: "Agenda",
      notes: "The agenda. After the introduction come the fundamentals and the state of the art. Then the three contributions of the method: first the capability of the vehicle, then the choice, with an MDP and then a POMDP; each step is illustrated with its animations. The validation, in simulation and on the prototype vehicle, comes at the end, before the conclusions and perspectives. Each line links to its part." },

    // ================================================================ 1. introduction: the ODD, monitored but not decided, the problem, the idea and the question, the aim, the contributions
    { id: "sec-intro", type: "section", sec: "intro", dark: true, title: "Introduction", time: 10 },

    { id: "odd", cite: ["mercedes2019drivepilot", "sae2021taxonomy", "nhtsa2021odd"], th: "The ODD", sec: "intro", kicker: "Motivation · what is the ODD?", time: 75, steps: 2,
      title: "Where is an automated vehicle designed to operate?",
      notes: "Let us start with the levels of driving automation defined by SAE. The big step is between Level 2 and Level 3: up to Level 2 the driver monitors and is the fallback; from Level 3, while the system is engaged, it performs the whole driving task and the responsibility shifts to the system, which must know its own limits. Mercedes-Benz Drive Pilot is the first Level 3 system approved in Europe. To say where it may drive, Mercedes describes a driving scene with five conditions: a highway with lane markings, dense traffic, a route covered by the HD map, and suitable weather. (1) This description has a name: the Operational Design Domain, the ODD. SAE J3016 defines it as the operating conditions under which a driving automation system, or a feature of it, is specifically designed to function. The designer knows the performance of the system and states the contexts in which it works correctly and safely; outside the ODD, the system is beyond its limits. (2) How is it described in general? As a taxonomy: here the one proposed by the NHTSA, six top-level dimensions, each broken down into sub-attributes. Physical infrastructure: roadway types, such as divided highways or urban streets, roadway surfaces, edges such as lane markings or barriers, and geometry, such as curves and slopes. Operational constraints: speed limits and traffic conditions. Objects: signage, other road users such as vehicles, pedestrians and cyclists, and non-road-user obstacles. Connectivity: vehicle-to-vehicle communication, traffic density information, remote fleet management, infrastructure sensors. Environmental conditions: weather such as rain, snow or fog, weather-induced road conditions, particulate matter, illumination such as night or sun glare. Zones: geofencing, traffic management zones, school or construction zones, regions or states, interference zones such as tunnels. Defining it is already a demanding task. But once it is defined, the question becomes: the context keeps changing, so how does the vehicle decide with respect to it?",
      html: `<div class="row grow">
        <div class="card col" style="flex:1.15 1 0;gap:12px">
          <div class="saestrip" aria-label="SAE levels of driving automation: from Level 3, the system is the fallback">
            <div class="grp drv"><div class="lv">L0</div><div class="lv">L1</div><div class="lv">L2</div><div class="who">Driver fallback</div></div>
            <div class="step" aria-hidden="true"></div>
            <div class="grp sys"><div class="lv on">L3</div><div class="lv">L4</div><div class="lv">L5</div><div class="who">System fallback</div></div>
          </div>
          <img src="${F}odd_mercedes.jpg" alt="Mercedes-Benz Drive Pilot ODD shown as a driving scene" style="width:100%;flex:1;min-height:0;object-fit:contain;border-radius:10px">
          <p style="margin:0;text-align:center;font-size:26px"><b>Mercedes-Benz Drive Pilot</b>, the first Level 3 approved in Europe ${R("mercedes2019drivepilot")}</p></div>
        <div class="col grow" style="flex:1 1 0;gap:22px;justify-content:center">
          <div class="card navy" data-step="1" style="padding:30px 38px"><h3 style="margin:0 0 16px;font-size:36px;white-space:nowrap">Operational Design Domain (ODD)</h3>
            <div class="quote" style="font-size:30px;color:#fff;line-height:1.35">“Operating conditions under which a given driving automation system or feature thereof is <b style="color:var(--amber)">specifically designed to function</b>,</div>
            <div style="font-size:21px;line-height:1.45;color:#c7d3e3;margin-top:10px;font-style:italic">including, but not limited to, environmental, geographical, and time-of-day restrictions, and/or the requisite presence or absence of certain traffic or roadway characteristics.”</div>
            <p class="xs" style="margin:12px 0 0;opacity:.8">SAE J3016 ${R("sae2021taxonomy")}</p></div>
          <div class="card" data-step="2"><h4>Described as a taxonomy</h4><div class="oddtax">
              <div><b>Physical infrastructure</b></div><div><b>Operational constraints</b></div><div><b>Objects</b></div>
              <div><b>Connectivity</b></div><div><b>Environmental conditions</b></div><div><b>Zones</b></div>
            </div><p class="xs mute" style="margin:10px 0 0">NHTSA ${R("nhtsa2021odd")}</p></div>
        </div></div>` },

    { id: "context", cite: ["cardenas2025context_aware", "charmet2024monitoring"], th: "Monitored, not decided", sec: "intro", kicker: "Motivation · how the ODD is used today", time: 60, steps: 2,
      title: "The ODD is defined, but the context keeps evolving",
      notes: "Now the ODD is defined, even if it is a demanding task. The difficulty is that the context does not stay fixed. Along one route, the context keeps changing: a highway exit, road works, missing lane markings, a tunnel, a traffic jam, a curve, rain expected ahead. The ODD, fixed by design, does not change. What changes is the operational domain, OD, the current conditions; staying in the ODD means keeping the OD inside it, now and on the route ahead. (1) Today, the ODD is mostly monitored, for instance by estimating the time before leaving it, with isolated condition checks and margins, but it rarely enters the decision process itself: decisions are taken without checking that the vehicle will be able to manage them, and the limit is noticed once it is crossed, with an abrupt deactivation, an emergency stop or, for a fleet, a suspended service. (2) What is needed is the opposite: anticipate, so that a fallback maneuver always remains ensured. A fallback maneuver is executed to reach a minimal risk condition when the driving task can no longer be continued within the ODD, for instance a controlled stop on the hard shoulder; at Level 3, the fallback can also be a timely request to the driver to take over. So: anticipate the limits inside the decision, keep operating with fewer capabilities while it is safe, and start the fallback while it is still feasible. That is graceful degradation.",
      html: `<div class="row grow">
        <div class="card col" style="flex:0 0 700px;padding:20px 26px"><h4>One route, many context changes ${R("cardenas2025context_aware")}</h4>${fig("context_changes.png", "Target route with context changes: highway exit, road works, missing lane markings, tunnel, traffic jam, curved road, expected rain")}</div>
        <div class="col grow" style="justify-content:center;gap:30px">
          <div class="card accent"><h3 style="margin:0">Context evolves during the whole itinerary</h3></div>
          <div class="card bad" data-step="1"><h3 style="margin:0">Today: Monitor, then react ${R("charmet2024monitoring")}</h3></div>
          <div class="card ok" data-step="2"><h3 style="margin:0">Needed: Anticipate, so a fallback maneuver always remains ensured</h3></div>
        </div></div>` },

    { id: "v-problem-a", th: "The problem", type: "video", sec: "intro", time: 45,
      title: "Monitoring is good, but not enough",
      notes: "Why is monitoring the ODD not enough? Here the band is the ODD, and rain ahead narrows it. The vehicle plans its maneuvers and monitoring checks each one: it is admissible when it is taken. (pause) But monitoring only looks one step ahead. Without anticipation, the ensured options shrink at each step, until the vehicle reaches a state with no fallback left, although no single decision was wrong.",
      // a short stop after the first step, to point at the rain ahead; then the rest in one go
      video: { src: A + "problem.mp4?v=6", parts: [[0.0, "Monitoring is good, but not enough"], [3.5, "Without anticipation, no fallback left"]], end: 16.0 } },

    { id: "question", th: "The idea", sec: "intro", kicker: "Problem statement · our idea", time: 70, steps: 1,
      title: "From monitoring to deciding",
      notes: "Hence the research question: how can an intelligent vehicle ensure ODD-compliant decision-making as its operational context continuously evolves? ODD-compliant means more than admissible when chosen: the decision keeps the vehicle within its ODD throughout its execution, and leads to states from which it can keep operating. (1) Our idea is to bring the ODD into the decision, with one principle that guides all the contributions: capability precedes choice. First, capability: what can the vehicle still do safely, now and in the situations its decisions lead to. Then, choice: among those options only, which maneuvers, in which order, keeping a minimal risk condition within reach.",
      html: `<div class="card navy rq" style="padding:40px 64px"><div class="quote" style="font-size:42px">How can an intelligent vehicle ensure <b>ODD-compliant</b> decision-making as its operational context <b>continuously evolves</b>?</div></div>
        <div class="col grow" data-step="1" style="gap:34px;justify-content:center">
          <div class="cpch"><span>One guiding thread</span><b>Capability precedes choice</b></div>
          <div class="cpcflow">
            <div class="card ok cpc2"><svg class="cpi" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" stroke-width="4.5"/><path d="M23.5 25a8.5 8.5 0 1 1 12.6 7.4c-2.6 1.5-4.1 3.2-4.1 6.1v1.5" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/><circle cx="32" cy="47" r="3" fill="currentColor"/></svg><div><h3>1 · Capability</h3>
              <p>Knowing what the vehicle is <b>capable of doing</b></p></div></div>
            <div class="arrow-big">→</div>
            <div class="card cpc2 cho"><svg class="cpi" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 58V36M32 36L15 15M32 36l17-21" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 26V13h13M51 26V13H38" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg><div><h3>2 · Choice</h3>
              <p>Choosing the <b>best decision</b> to execute</p></div></div>
          </div></div>` },

    { id: "v-problem-b", th: "The aim", type: "video", sec: "intro", time: 40,
      title: "Anticipate, and keep a minimal risk condition within reach",
      notes: "What we want instead: anticipate the loss of capability. Under the rain the vehicle keeps fewer options, but its policy can always lead it to a minimal risk condition, through a fallback maneuver. This is fail-operational decision-making.",
      video: { src: A + "problem.mp4?v=6", parts: [[16.0, "Anticipate the loss of capability"], [25.5, "Fail-operational: a minimal risk condition always within reach"]] } },

    { id: "contrib", cite: ["CARDENAS2025162", "11097482"], th: "The contributions", type: "outline", sec: "intro", kicker: "Contributions and outline", time: 60,
      title: "Outline",
      notes: "How we get there. Four contributions, one principle: capability precedes choice. Each one answers a question. The first three are the method, each illustrated with its animations; the fourth is the validation of all of them, in simulation and on a prototype vehicle. Each line links to its part.",
 },

    // ================================================================ 2. fundamentals and state of the art
    { id: "sec-sota", type: "section", sec: "sota", dark: true, title: "Fundamentals and state of the art", time: 10 },

    { id: "levels", cite: ["michon1985critical", "donges2015behaviormodels"], sec: "sota", kicker: "State of the art · decision levels", time: 50,
      title: "We decide at the tactical level, which maneuver and when",
      notes: "Three decision levels after Michon. Strategic: the route, over hours to minutes. Tactical: which maneuver, and when, from a minute to a second. Operational: the trajectory and its control, below the second. We work at the tactical level, over ADAS features already validated.",
      html: `<div class="row grow" style="align-items:stretch">
        <div class="card col" style="flex:1.2 1 0;justify-content:center"><h4>Michon's three levels ${R("michon1985critical", "donges2015behaviormodels")}</h4>${fig("michon_focus.png", "Michon's levels of the driving task, the tactical level in focus")}</div>
        <div class="col grow" style="justify-content:center;gap:26px">
          <div class="card tight"><h3 style="margin:0;color:var(--mute)">Strategic · the route</h3></div>
          <div class="card tight ok"><h3 style="margin:0">Tactical · which maneuver, when</h3></div>
          <div class="card tight"><h3 style="margin:0;color:var(--mute)">Operational · the control</h3></div>
        </div></div>` },

    { id: "methods", cite: ["olsson2016BT", "hang2021gametheoric", "ulbrich2015pomdp", "hubmann2018uncertainty", "hoel2019combiningdeep", "fiedler2022hybrid"], sec: "sota", kicker: "State of the art · tactical decision-making", time: 60,
      title: "How do existing methods decide?",
      notes: "The state of the art in one table, the synthesis of our survey. Probabilistic methods handle uncertainty and long horizons at a computational cost, which online sampling solvers mitigate. Learning-based methods scale but give no guarantee. In all families, the context describes the scene.",
      html: `<table class="tbl" style="font-size:30px;margin:auto 0"><tr><th>Method</th><th class="c">Uncert.</th><th class="c">Scal.</th><th class="c">Unseen</th><th class="c">Horizon</th><th class="c">Explain.</th><th class="c">Cost</th><th class="c">Real time</th><th>Main limitation</th></tr>
        <tr><td><b>Rule-based</b> ${R("olsson2016BT")}</td><td class="c">−</td><td class="c">−</td><td class="c">−</td><td class="c">−</td><td class="c">++</td><td class="c">++</td><td class="c">++</td><td>Encoded cases only</td></tr>
        <tr class="hl"><td><b>Probabilistic</b> ${R("hang2021gametheoric", "ulbrich2015pomdp", "hubmann2018uncertainty")}</td><td class="c">++</td><td class="c">+</td><td class="c">+</td><td class="c">++</td><td class="c">+</td><td class="c">−</td><td class="c">+</td><td>Cost grows with the belief</td></tr>
        <tr><td><b>Learning-based</b> ${R("hoel2019combiningdeep")}</td><td class="c">+</td><td class="c">++</td><td class="c">++</td><td class="c">++</td><td class="c">−</td><td class="c">−</td><td class="c">+</td><td>Black box, no guarantee</td></tr>
        <tr><td><b>Hybrid</b> ${R("fiedler2022hybrid")}</td><td class="c">++</td><td class="c">−</td><td class="c">+</td><td class="c">++</td><td class="c">+</td><td class="c">−−</td><td class="c">+</td><td>Scalability and cost</td></tr></table>
        <div class="card bad"><h3 style="margin:0">Missing everywhere · does the vehicle <b>remain capable</b>?</h3></div>`,
      backups: ["b-learning"] },

    { id: "rw-c1", cite: ["reschka2015ability", "colwell_automated_2018", "pior2020behaviorbased", "ulbrich2015pomdp", "charmet2024monitoring", "salvi2022fuzzy"], sec: "sota", c: ["C1"], kicker: "Related work · capability assessment", time: 70,
      title: "How is the capability of the vehicle assessed today?",
      notes: "Three families. Ability and skill graphs decompose a behavior into skills with a level of performance, and have been used to trigger a lane change or not. The restricted operational domain removes the maneuvers that a lost capability no longer supports. The arbitration graph checks every function against the ODD before deciding. Monitoring estimates the time to exit the ODD. All of them assess the current state, and adapt once a condition is detected. The MCE assesses each maneuver, in the predicted states too.",
      html: `<div class="g3 grow">
          <div class="card tight col" style="gap:6px">${fig("rw_ability_graph.png", "Ability graph for an ACC behavior")}<h4 style="margin:0;text-align:center">Ability graphs ${R("reschka2015ability", "ulbrich2015pomdp")}</h4></div>
          <div class="card tight col" style="gap:6px">${fig("rw_rod.png", "Restricted Operational Domain")}<h4 style="margin:0;text-align:center">Restricted domain ${R("colwell_automated_2018")}</h4></div>
          <div class="card tight col" style="gap:6px">${fig("rw_arbitration_graph.png", "Arbitration graph")}<h4 style="margin:0;text-align:center">Arbitration graph ${R("pior2020behaviorbased")}</h4></div>
        </div>
        <div class="card bad"><h3 style="margin:0">The current state only, then react ${R("charmet2024monitoring", "salvi2022fuzzy")}</h3></div>` },

    { id: "positioning", cite: ["cardenas2025context_aware"], sec: "sota", kicker: "Positioning", time: 75,
      title: "What is missing in the state of the art?",
      notes: "The four gaps identified at the end of the survey, published in IEEE Transactions on Intelligent Vehicles in 2025. For each, what exists, what is missing, and the contribution that addresses it. Each badge links to its part.",
      backups: ["b-learning"],
      html: `<div class="g2 grow">
        ${[["Long-term, sequential decisions", "MDPs and POMDPs plan sequences", "Most methods pick one maneuver at a time", ["C2", "C3"]],
           ["Capability in future states", "Skill graphs and restricted domains", "Current state only, reactive", ["C1", "C2"]],
           ["Situation awareness enriched by the ODD", "ODD monitoring, time to exit", "Scene described, capability not assessed", ["C1"]],
           ["Interdependent ODD dimensions", "Each dimension monitored", "One dimension at a time", ["C1"]]]
          .map(([t, y, n, cs], j) => `<div class="card col" style="gap:28px;padding:30px 44px;justify-content:center"><div class="row" style="align-items:center;gap:22px"><div class="num-badge" style="width:64px;height:64px;font-size:30px;flex:none">${j + 1}</div><h3 style="margin:0;font-size:40px">${t}</h3></div>
            <div class="row" style="align-items:center;gap:12px;padding-left:86px">${cs.map((c) => `<a class="cbadge ink" data-go="sec-${c.toLowerCase()}" href="#/sec-${c.toLowerCase()}">${({ C1: "Decisional capability", C2: "ODD-MDP", C3: "ODD-POMDP", C4: "Validation" })[c]}</a>`).join("")}</div></div>`).join("")}
        </div>
        <p class="xs mute" style="margin:0;text-align:right">Gaps identified in our survey ${R("cardenas2025context_aware")}</p>` },

    // ================================================================ 3. C1 · capability: the architecture and the MCE, illustrated by its animations
    { id: "sec-c1", type: "section", sec: "c1", dark: true, title: "Decisional capability", time: 10 },

    { id: "architecture", sec: "c1", kicker: "Our answer: ODD-aptive", time: 170, steps: 6,
      title: "The ODD-aptive architecture, and its tactical layer",
      notes: "The ODD-aptive architecture, read as a loop. On the left, input preparation: the context sources (perception, V2X, map) feed the world model, which gives the tactical state s = OD × ego × surrounding vehicles. The decision follows Michon's three levels. The strategic layer plans the route from the map and the ego pose, and passes the route plan R. The tactical layer, our contribution, receives the current state s0 and the route plan, and decides which maneuver and when. Its current action a_t = (m_t, θ_t) goes to the operational layer: the ADAS features selector activates ACC, LCA, SALC or the MRM with its parameters, the trajectory planner gives the reference trajectory T, and low-level control sends the commands u_t to the vehicle. The measurements close the loop. (1) Zoom into the tactical layer. The current state, or belief, becomes the root s0 of the planning horizon builder. (2) For each state, the builder queries the MCE, which monitors the Sense, Think and Act skills each maneuver requires, and returns the ensured maneuvers A_ens(s). Here the lane change to the right is not ensured, so it is never expanded. (3) The state predictor computes the next state of each ensured maneuver, using the electronic horizon for the conditions ahead; query and prediction repeat up to the horizon H. (4) The result is an MDP, or a POMDP, whose actions are only ensured maneuvers: capability enters the model before the policy planner chooses. The reward combines safety, legal, progress, route and operability; the solver applies Bellman restricted to A_ens. (5) The output is a sequence of maneuvers, here keep lane, change left, then change right. Only the first one is executed, as an ADAS feature with its parameters; then the plan is rebuilt from the new state. (6) Back to the whole architecture, now with the tactical layer filled: the capability estimator, the horizon builder, the state predictor, the MDP or POMDP and the policy planner, between the state from the world model and the action sent to the operational layer.",
      html: `<div class="ar zm" data-dim="6">
        <div class="ov" data-dim="1">
        <div class="frm" style="left:0;top:0;width:340px;height:712px"><span class="frt">Input preparation</span></div>
        <div class="pn" style="left:14px;top:40px;width:312px;height:160px"><div class="ph"><span class="k">A</span>Context sources</div>
          <div class="pb"><div><b>Perception &amp; localization</b><div class="t">cameras · LiDAR · radar · GNSS</div></div><div><b>V2X</b> <span class="t">vehicles, infrastructure</span></div><div><b>Digital map</b> <span class="t">road topology</span></div></div></div>
        <div class="pn" style="left:14px;top:238px;width:312px;height:92px"><div class="ph"><span class="k">B</span>World model</div><div class="pb">Fusion, tracking, context update</div></div>
        <div class="pn" style="left:14px;top:368px;width:312px;height:334px"><div class="ph"><span class="k">C</span>State representation</div>
          <div class="pb ctr"><div class="eqs"><i>𝒮</i> = OD × <i>p</i><sub>ego</sub> × {<i>p<sub>i</sub></i>}</div><div class="t">Operational domain (OD)</div><img src="${F}arch_od.jpg" alt="Operational domain: weather, road type, speed limit" style="width:270px"><div class="t">Dynamic scenario, ego and other vehicles</div><img src="${F}arch_scen.jpg" alt="Ego vehicle and surrounding vehicles" style="width:228px"></div></div>
        <div class="pn" style="left:0;top:752px;width:340px;height:100px"><div class="ph"><span class="k">G</span>Input environment</div><img class="cover" src="${F}arch_env.jpg" alt="Highway traffic"></div>

        <div class="pn" style="left:430px;top:0;width:940px;height:196px"><div class="ph"><span class="k">D</span>Strategic layer<span class="s">Mission and route planning at the road-network level</span></div>
          <div class="pb row"><img src="${F}arch_city.jpg" alt="Route on a city map" style="width:640px;height:107px;border-radius:8px"><div class="rp"><b>Route plan <i>𝓡</i></b><ul><li>Road segments</li><li>Upcoming exit</li><li>Destination</li></ul></div></div></div>

        <div class="pn tac" style="left:430px;top:262px;width:940px;height:447px"><div class="ph"><span class="k">E</span>Tactical layer<span class="s">Maneuver decisions with ensured maneuver capabilities</span><span class="tag">Contribution</span></div></div>

        <div class="pn" style="left:1460px;top:262px;width:332px;height:447px"><div class="ph"><span class="k">F</span>Operational layer</div></div>
        <div class="pn sb" style="left:1474px;top:304px;width:304px;height:164px"><div class="ph"><span class="k">F1</span>ADAS features selector</div><img src="${F}arch_adas.png" alt="ACC, LCA, SALC and MRM execution" style="width:288px;margin:6px 6px 0"></div>
        <div class="pn sb" style="left:1474px;top:498px;width:304px;height:96px"><div class="ph"><span class="k">F2</span>Trajectory planner</div><img src="${F}arch_traj.jpg" alt="Reference trajectory" style="width:288px;margin:2px 6px 0"></div>
        <div class="pn sb" style="left:1474px;top:622px;width:304px;height:78px"><div class="ph"><span class="k">F3</span>Low-level control</div><div class="pb ctr" style="justify-content:center;flex:1;padding:4px 8px">Lateral and longitudinal control</div></div>

        <svg class="wires" viewBox="0 0 1792 852" aria-hidden="true">
          <defs><marker id="arA-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#063669"/></marker></defs>
          <g marker-end="url(#arA-n)">
            <path class="w" d="M170 200 V234"/><path class="w" d="M170 330 V364"/>
            <path class="w" d="M326 284 H392 V100 H426"/>
            <path class="w" d="M326 520 H426"/><path class="w" d="M900 196 V258"/>
            <path class="w" d="M1370 380 H1470"/>
            <path class="w" d="M1626 468 V494"/><path class="w" d="M1626 594 V618"/>
            <path class="w" d="M1626 700 V806 H344"/><path class="w" d="M170 752 V716"/>
          </g>
          <text class="vl" transform="translate(381 192) rotate(-90)" text-anchor="middle">Map + ego pose</text>
        </svg>
        <div class="sig" style="left:182px;top:207px">Observations</div>
        <div class="sig" style="left:182px;top:331px;font-size:13.5px;line-height:1.15">Integrated world<br>representation</div>
        <div class="sig" style="left:346px;top:466px">Current<br>state <i>s</i><sub>0</sub></div>
        <div class="sig" style="left:914px;top:214px">Route plan <i>𝓡</i></div>
        <div class="sig zh" style="left:1080px;top:344px;width:282px;text-align:right">Current action <i>a<sub>t</sub></i> = (<i>m<sub>t</sub></i>, <i>θ<sub>t</sub></i>)</div>
        <div class="sig" style="left:1634px;top:471px;font-size:13.5px">Selected feature + <i>θ<sub>t</sub></i></div>
        <div class="sig" style="left:1634px;top:597px;font-size:13.5px">Reference trajectory <i>T</i></div>
        <div class="sig" style="left:1180px;top:778px">Control commands <i>u<sub>t</sub></i></div>
        <div class="sig" style="left:182px;top:722px">Measurements</div>
        </div>
        <div class="q" data-until="1" style="left:430px;top:372px;width:940px"><div class="qm">?</div><div class="qt">Which maneuver, and when?</div></div>

        <div class="dt">
        <div class="pn after" data-step="1" style="left:110px;top:386px;width:552px;height:240px"><div class="ph"><span class="k">E2</span>Planning horizon builder<span class="s">states (MDP) · beliefs (POMDP)</span></div></div>

        <div class="pn" data-step="2" style="left:110px;top:96px;width:552px;height:240px"><div class="ph"><span class="k">E1</span>Maneuver Capability Estimator<span class="tag cap">Monitoring</span></div>
          <div class="mce">
            <div><h5>Sense</h5><span class="sk l">Sense skill 1</span><span class="sk b">Sense skill 2</span><span class="sk k">Sense skill 3</span></div>
            <div><h5>Think</h5><span class="sk l">Think skill 1</span><span class="sk b">Think skill 2</span><span class="sk k">Think skill 3</span></div>
            <div><h5>Act</h5><span class="sk b">Act skill 1</span><span class="sk l">Act skill 2</span><span class="sk k">Act skill 3</span></div>
          </div>
          <div class="lg"><span class="sk k sw"></span>KL requires <span class="sk l sw"></span>LCL requires · ensured if all its skills hold in <i>s<sub>i</sub></i></div></div>

        <div class="pn mg" data-step="4" style="left:760px;top:96px;width:400px;height:240px"><div class="ph"><span class="k"><i>𝓜</i></span>MDP / POMDP with ensured maneuvers</div>
          <div class="pb"><ul class="ls"><li>States <i>s<sub>i</sub></i>, or beliefs <i>b<sub>i</sub></i>, up to horizon <i>H</i></li><li>Actions restricted to <i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</li><li>Predicted transitions (<i>s<sub>i</sub></i>, <i>a</i>, <i>s′</i>)</li></ul><div class="t" style="margin-top:4px"><b class="mgt">Capability enters the model</b> before the policy is optimized</div></div></div>

        <div class="pn" data-step="3" style="left:760px;top:430px;width:400px;height:196px"><div class="ph"><span class="k">E3</span>State predictor<span class="s">+ electronic horizon (V2X)</span></div>
          <div class="e3"><figure><img src="${F}arch_e3in.jpg" alt="Input state and lane change to the left"><figcaption>state <i>s<sub>i</sub></i> + maneuver <i>a</i></figcaption></figure><span class="ar1">→</span><figure><img src="${F}arch_e3out.jpg" alt="Predicted state"><figcaption>predicted state <i>s′</i></figcaption></figure></div>
          <div class="eqs" style="text-align:center;font-size:19px"><i>s′</i> = <i>f</i>(<i>s<sub>i</sub></i>, <i>a</i>), &nbsp;<i>a</i> ∈ <i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</div></div>

        <div class="pn" data-step="4" style="left:1210px;top:130px;width:566px;height:496px"><div class="ph"><span class="k">E4</span>Policy planner<span class="tag cho">Choice</span></div>
          <div class="e4">
            <div class="blk"><div class="sh"><span class="k">E4.1</span>Reward evaluation</div>
              <table class="rw"><tr><td>Safety</td><td>collision, TTC / TIV risk</td><td><i>R</i><sub>col</sub>, <i>R</i><sub>risk</sub></td></tr>
                <tr><td>Legal</td><td>speed limit</td><td><i>R</i><sub>legal</sub></td></tr>
                <tr><td>Progress</td><td>driving speed</td><td><i>R</i><sub>speed</sub></td></tr>
                <tr><td>Route</td><td>itinerary lane, next exit</td><td><i>R</i><sub>route</sub></td></tr>
                <tr><td>Operability</td><td>ensured maneuvers, MRM</td><td><i>R</i><sub>op</sub>, <i>R</i><sub>time</sub></td></tr></table>
              <div class="eqs" style="text-align:center;margin-top:6px"><i>R</i>(<i>s</i>) = Σ<sub><i>k</i></sub> <i>W<sub>k</sub></i> <i>R<sub>k</sub></i>(<i>s</i>)</div></div>
            <div class="blk"><div class="sh"><span class="k">E4.2</span>Solver</div>
              <div class="eqs" style="font-size:20px;text-align:center"><i>V</i>(<i>s</i>) = max<sub><i>a</i> ∈ <i>A</i><sub>ens</sub>(<i>s</i>)</sub> [ <i>R</i>(<i>s</i>, <i>a</i>) + <i>γ</i> Σ<sub><i>s′</i></sub> <i>P</i>(<i>s′</i> | <i>s</i>, <i>a</i>) <i>V</i>(<i>s′</i>) ]</div>
              <div class="t" style="text-align:center">value iteration (MDP) · Monte Carlo tree search (POMDP)</div>
              <div class="cpc1">max over <i>A</i><sub>ens</sub>(<i>s</i>) only, <b>capability precedes choice</b></div></div>
            <div class="po">Policy <i>π</i></div>
          </div></div>

        <div class="outc" data-step="5" style="left:110px;top:660px;width:1340px;height:176px">
          <div class="o1"><div class="ot">A sequence of maneuvers</div><div class="eqs big"><i>π</i>(<i>s</i><sub>0</sub>) = <i>A</i><sub>1</sub> → <i>A</i><sub>2</sub> → <i>A</i><sub>3</sub></div><div class="t">here keep lane → change left → change right</div></div>
          <img src="${F}arch_pol.jpg" alt="Sequence KL, LCL, LCR" style="width:540px;border-radius:8px">
          <div class="o3"><b>Only <i>A</i><sub>1</sub> is executed</b><div class="t">then the plan is rebuilt from the new state (receding horizon)</div></div></div>

        <svg class="wires" viewBox="0 0 1792 852" aria-hidden="true">
          <defs><marker id="arB-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#063669"/></marker>
          <marker id="arB-m" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10z" fill="#a8237e"/></marker></defs>
          <g transform="translate(-118 0)">
            <g data-step="5"><path class="w am" d="M290 535 L470 490 L640 522 L724 522"/></g>
            <g class="after" data-step="1"><path class="w" d="M124 535 H258" marker-end="url(#arB-n)"/>
              <g class="nd"><circle cx="290" cy="535" r="28"/><text class="nt" x="290" y="537">s₀</text></g></g>
            <g data-step="2">
              <path class="w" d="M380 384 V340" marker-end="url(#arB-n)"/>
              <path class="w" d="M640 338 V382" marker-end="url(#arB-n)"/>
              <path class="w" d="M317 528 L444 497" marker-end="url(#arB-n)"/>
              <path class="w" d="M316 546 L444 581" marker-end="url(#arB-n)"/>
              <path class="w bad" d="M300 562 L321 603"/><text class="xx" x="325" y="613">✕</text>
              <text class="el" x="366" y="503">KL</text><text class="el" x="384" y="586">LCL</text><text class="el bad" x="250" y="606">LCR</text>
            </g>
            <g data-step="3">
              <path class="w" d="M780 470 H874" marker-end="url(#arB-n)"/>
              <path class="w" d="M878 590 H784" marker-end="url(#arB-n)"/>
              <path class="w" d="M492 486 L616 472" marker-end="url(#arB-n)"/>
              <path class="w" d="M491 497 L617 517" marker-end="url(#arB-n)"/>
              <path class="w" d="M492 588 L616 584" marker-end="url(#arB-n)"/>
              <path class="w bad" d="M486 603 L540 613"/><text class="xx" x="546" y="620">✕</text>
              <text class="el" x="546" y="471">KL</text><text class="el" x="530" y="530">LCL</text><text class="el" x="546" y="580">KL</text>
              <g class="nd p"><circle cx="470" cy="490" r="22"/><text class="nt" x="470" y="492">s₁</text></g>
              <g class="nd p"><circle cx="470" cy="588" r="22"/><text class="nt" x="470" y="590">s₂</text></g>
              <g class="nd p"><circle cx="640" cy="470" r="20"/><text class="nt sm" x="640" y="472">s₃</text></g>
              <g class="nd p"><circle cx="640" cy="522" r="20"/><text class="nt sm" x="640" y="524">s₄</text></g>
              <g class="nd p"><circle cx="640" cy="584" r="20"/><text class="nt sm" x="640" y="586">s₅</text></g>
              <text class="dots" x="700" y="476">…</text><text class="dots" x="700" y="590">…</text>
              <text class="dl" x="290" y="446">depth 0</text><text class="dl" x="470" y="446">depth 1</text><text class="dl" x="640" y="446">depth 2</text><text class="dl" x="738" y="446">… <tspan font-style="italic" font-family="Cambria Math, serif">H</tspan></text>
              <text class="el bad" x="672" y="616" style="font-size:13px">✕ not ensured</text>
            </g>
            <g data-step="5">
              <circle class="ring" cx="470" cy="490" r="27"/><circle class="ring" cx="640" cy="522" r="25"/>
              <text class="el am" x="680" y="514">LCR</text>
            </g>
          </g>
          <g data-step="4">
            <path class="w mg" d="M662 410 H712 V214 H754" marker-end="url(#arB-m)"/>
            <path class="w mg" d="M1160 214 H1204" marker-end="url(#arB-m)"/>
            <path class="w" d="M1250 74 V126" marker-end="url(#arB-n)"/>
          </g>
          <g data-step="5">
            <path class="w" d="M1330 626 V656" marker-end="url(#arB-n)"/>
            <path class="w" d="M1450 748 H1782" marker-end="url(#arB-n)"/>
          </g>
        </svg>
        <div class="sig after" data-step="1" style="left:14px;top:498px"><i>s</i><sub>0</sub> / <i>b</i><sub>0</sub></div>
        <div class="sig t after" data-step="1" style="left:14px;top:546px">from C</div>
        <div class="sig" data-step="2" style="left:104px;top:349px;width:150px;text-align:right">Query with state <i>s<sub>i</sub></i></div>
        <div class="sig" data-step="2" style="left:532px;top:347px"><i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</div>
        <div class="sig" data-step="3" style="left:668px;top:440px"><i>s<sub>i</sub></i>, <i>A</i><sub>ens</sub>(<i>s<sub>i</sub></i>)</div>
        <div class="sig" data-step="3" style="left:672px;top:597px">(<i>s<sub>i</sub></i>, <i>a</i>, <i>s′</i>)</div>
        <div class="sig" data-step="4" style="left:1262px;top:84px">Route plan <i>𝓡</i> from D</div>
        <div class="sig" data-step="5" style="left:1342px;top:630px">policy <i>π</i></div>
        <div class="sig" data-step="5" style="left:1490px;top:714px"><i>a<sub>t</sub></i> = (<i>m<sub>t</sub></i>, <i>θ<sub>t</sub></i>)</div>
        <div class="sig t" data-step="5" style="left:1470px;top:758px;line-height:1.2">current action, to the<br>ADAS features selector (F1)</div>
        </div>
      </div>` },

    { id: "maneuvers", cite: ["AVSC2021BehavioralCompetencies", "iso2023iso34503", "colwell_automated_2018"], sec: "c1", c: ["C1"], kicker: "Mapping the ODD to the behavioral level", time: 55,
      title: "The driving task splits into maneuvers, each with its own limits",
      notes: "Asking whether the whole vehicle is within its ODD is too coarse. The task is decomposed into maneuvers, and the question is asked for each of them. Each maneuver has its own boundaries in the space of the operational constraints.",
      html: `<div class="card col" style="flex:1.3 1 0">${fig("decomposition.jpg", "Decomposition of the driving task into maneuvers")}</div>
        <div class="g3">
          <div class="card"><h4>Maneuvers ${R("AVSC2021BehavioralCompetencies")}</h4><div class="eq"><i>U</i> = {KL, LCL, LCR, MRM}</div><p class="small">Each activates an existing feature, with its parameters</p></div>
          <div class="card"><h4>Operational domain ${R("iso2023iso34503", "colwell_automated_2018")}</h4><div class="eq"><i>X</i><sub>ODD</sub> = <i>C</i><sub>1</sub> × <i>C</i><sub>2</sub> × … × <i>C<sub>n</sub></i></div><p class="small">The OD, a point moving in this space</p></div>
          <div class="card"><h4>Constraints</h4><p class="small"><b>Continuous</b>, visibility or density, with margins<br><b>Discrete</b>, road type or works, to predict</p></div>
        </div>` },

    { id: "operability", cite: ["colwell_automated_2018", "charmet2024monitoring"], sec: "c1", c: ["C1"], kicker: "Ensured maneuvers and levels of operability", time: 45,
      title: "Three levels of operability, from the set of ensured maneuvers",
      notes: "Three levels of operability. Degradation is per maneuver, not an intermediate level: a maneuver can remain ensured with a reduced performance range. The same assessment runs on predicted states, fed by the electronic horizon.",
      html: `<div class="g3">
          <div class="card ok col" style="gap:22px;padding:34px 36px"><span class="pill ok" style="align-self:flex-start;font-size:24px">Full operability</span><div class="eq" style="font-size:44px">${Uens()} = <i>U</i></div><p style="font-size:28px">Every maneuver ensured</p></div>
          <div class="card deg col" style="gap:22px;padding:34px 36px"><span class="pill deg" style="align-self:flex-start;font-size:24px">Partial operability</span><div class="eq" style="font-size:44px">∅ ⊊ ${Uens()} ⊊ <i>U</i></div><p style="font-size:28px">Some maneuvers remain ${R("colwell_automated_2018")}</p></div>
          <div class="card bad col" style="gap:22px;padding:34px 36px"><span class="pill bad" style="align-self:flex-start;font-size:24px">Loss of operability</span><div class="eq" style="font-size:44px">${Uens()} = ∅</div><p style="font-size:28px">A fallback is required ${R("charmet2024monitoring")}</p></div>
        </div>
        <div class="card amber"><p>Degradation is <b>per maneuver</b>, with a reduced performance range</p></div>
        <div class="takeaway">Assessed on <b>predicted states</b> too, which makes anticipation possible</div>` },

    { id: "dcap", sec: "c1", c: ["C1"], kicker: "Assessing the decisional capability", time: 60, steps: 2,
      title: "How do the conditions affect what the vehicle can do?",
      notes: "We know that the operational domain changes along the journey, and that each maneuver has its own limits. The missing link is how a condition translates into what the vehicle can still do. Some conditions are discrete, true or false, such as road works or the road type; others are continuous, such as visibility or traffic density, and their effect depends on the speed and the traffic. (1) Our proposal to build this link is the decisional capability: is the vehicle still able to decide correctly, for this maneuver, in this operational domain? It is assessed before the choice, and it decides which maneuvers may enter the decision. (2) To answer it, each maneuver is decomposed after the Sense, Think, Act paradigm. Sense: does the vehicle acquire the information the decision needs? Think: can it process and interpret that information, for instance can its predictor handle the vehicles involved? Act: can it execute the maneuver once selected, with its braking, steering and power?",
      html: `<div class="row" style="gap:22px;align-items:stretch">
          <div class="card col" style="flex:1 1 0;gap:10px"><h4>The operational domain changes</h4>
            <p style="margin:0;font-size:28px"><b>Discrete</b> · road works, road type</p>
            <p style="margin:0;font-size:28px"><b>Continuous</b> · visibility, traffic density</p></div>
          <div class="arrow-big" style="align-self:center">→</div>
          <div class="card col" style="flex:1 1 0;gap:10px;justify-content:center"><h4>What can it still do?</h4>
            <p style="margin:0;font-size:28px">Which maneuvers remain <b>ensured</b></p></div>
        </div>
        <div class="card navy rq" data-step="1" style="padding:28px 54px"><span class="xs" style="opacity:.8;letter-spacing:.08em;text-transform:uppercase">Decisional capability</span>
          <div class="quote" style="font-size:38px;margin-top:6px">Is the vehicle still able to <b>decide correctly</b> in this operational domain?</div></div>
        <div class="g3 grow" data-step="2">
          <div class="card col" style="justify-content:center;gap:8px"><span class="pill" style="align-self:flex-start;font-size:22px">Sense</span><p style="margin:0;font-size:28px">Does it <b>perceive</b> what the decision needs?</p></div>
          <div class="card col" style="justify-content:center;gap:8px"><span class="pill" style="align-self:flex-start;font-size:22px">Think</span><p style="margin:0;font-size:28px">Can it <b>interpret</b> it?</p></div>
          <div class="card col" style="justify-content:center;gap:8px"><span class="pill gray" style="align-self:flex-start;font-size:22px">Act</span><p style="margin:0;font-size:28px">Can it <b>execute</b> it?</p></div>
        </div>` },

    { id: "skills", cite: ["reschka2015ability", "jatzkowski2021knowledge"], sec: "c1", c: ["C1"], kicker: "Assessing the decisional capability", time: 60,
      title: "A maneuver is ensured when all its skills are fulfilled",
      notes: "We decomposed the driving behavior into maneuvers; now each maneuver is decomposed into skills. A maneuver can only be performed if the vehicle can perceive, interpret and act as it requires: these are its skills. They are organized after the Sense, Think, Act paradigm of Pfeifer. Sense: the acquisition of the information required to assess and support the maneuver. Think: the ability to process and interpret this information for decision-making. Act: the ability to execute the maneuver once selected. Each skill k has an evaluation function f_k of the state, equal to 1 when it is fulfilled; it is expressed on the operational domain, so it can be evaluated on a predicted state, which is what makes anticipation possible. A maneuver is ensured when all its skills are fulfilled.",
      html: `<div class="hier"><a class="h" data-go="maneuvers">Driving behavior</a><i>→</i><a class="h" data-go="maneuvers">Maneuvers <small>KL · LCL · LCR · MRM</small></a><i>→</i><span class="h on">Skills <small>Sense · Think · Act</small></span></div>
        <div class="row grow">
        <div class="card col" style="flex:1.25 1 0"><h4>Maneuver Capability Estimator (MCE)</h4>${fig("skills.png", "Skills of the Maneuver Capability Estimator")}</div>
        <div class="col grow">
          <div class="card eqbox"><div class="eq"><i>u<sub>i</sub></i> ∈ ${Uens()} ⇔ ∀<i>k</i> ∈ 𝒦(<i>u<sub>i</sub></i>), <i>f<sub>k</sub></i>(<i>S</i>) = 1</div><div class="lgd one" style="margin-top:6px"><span class="s">𝒦(<i>u</i>)</span><span>skills required by <i class="m">u</i></span><span class="s"><i>f<sub>k</sub></i>(<i>S</i>)</span><span>skill <i class="m">k</i> fulfilled in state <i class="m">S</i>, current or predicted</span></div></div>
          <div class="card tight"><p class="small" style="margin:0">Each skill is expressed on the <b>operational domain</b>, so it can be evaluated on a <b>predicted</b> state</p></div>
          <p class="small" style="margin:0">Skill graphs, shared between maneuvers ${R("reschka2015ability", "jatzkowski2021knowledge")}</p>
        </div></div>` },

    { id: "v-mce", type: "video", sec: "c1", c: ["C1"], time: 60,
      title: "The Maneuver Capability Estimator",
      notes: "Skill graphs per maneuver, evaluation in S_i, one skill lost (partial operability), a shared skill lost (MRM required), traceability back to the context.",
      video: { src: A + "mce.mp4", parts: [[0.0, "Each maneuver relies on its own skill graph"], [12.5, "A maneuver is ensured when all its skills are fulfilled"], [21.0, "A change of context affects only the maneuvers that need the skill"], [32.5, "A shared skill is lost: every maneuver that needs it is lost"], [44.5, "Every loss is traced back to a change of context"]] } },

    { id: "lc-example", cite: ["CARDENAS2025162"], sec: "c1", c: ["C1"], kicker: "Application to a lane change", time: 50,
      title: "The skills of a lane change",
      notes: "From the general estimator to one example: the lane change. It is ensured when all its skills hold. Sense: the vehicles in three zones, A behind us in the target lane, B ahead in the target lane, C ahead in our lane, and the lane markings of the target lane. Think: the predictor models every perceived vehicle, and the traffic is fluid enough for the function. Act is assumed fulfilled in this work. We develop the first skill: how much perception range does each zone need? The answer comes from a safe distance, RSS.",
      html: `<div class="row grow">
        <div class="card col" style="flex:0.82 1 0"><h4>Zones of a lane change to the left ${R("CARDENAS2025162")}</h4>${fig("zones.jpg", "Zones A, B and C of the lane change")}
          <p class="small" style="margin:0"><b>A</b> behind and <b>B</b> ahead in the target lane, <b>C</b> ahead in the ego lane</p></div>
        <div class="col grow" style="gap:14px;justify-content:center">
          <div class="card eqbox"><div class="eq" style="font-size:29px">LC ∈ ${Uens()} ⇔ <i>f</i><sub>veh</sub>(<i>S</i>) = <i>f</i><sub>lane</sub>(<i>S</i>) = <i>f</i><sub>pred</sub>(<i>S</i>) = <i>f</i><sub>inter</sub>(<i>S</i>) = 1</div></div>
          <div class="card tight lcsk on"><span class="pill">Sense</span><span><b>Vehicles</b> in zones A, B and C</span><span class="pill amber nx">developed next</span></div>
          <div class="card tight lcsk"><span class="pill">Sense</span><span><b>Lane markings</b> of the target lane</span></div>
          <div class="card tight lcsk"><span class="pill">Think</span><span><b>Prediction</b> of every vehicle</span></div>
          <div class="card tight lcsk"><span class="pill">Think</span><span><b>Interaction</b> in fluid traffic</span></div>
          <div class="card tight lcsk"><span class="pill gray">Act</span><span>Assumed fulfilled</span></div>
        </div></div>` },


    { id: "rss", cite: ["shwartz2017RSS", "hasuo2022rss"], sec: "c1", c: ["C1"], kicker: "Sense skill · a safe distance", time: 60, steps: 3,
      title: "Inspired by RSS, the distance needed to stop in time",
      notes: "To assess the Sense skill we need a model of how far the vehicle must see in each zone. We start from a well-known one: RSS, Responsibility-Sensitive Safety, proposed by Mobileye, an Intel company, in 2017. It gives the minimum distance between a rear and a front vehicle so that the rear one never hits the front one, even if the front vehicle brakes as hard as it can until it stops. (1) First, the response: during its response time rho, the rear vehicle keeps driving and may even accelerate at a_max. (2) Then it brakes at least at b_min, from the speed it reached. (3) Minus the distance the front vehicle needs to stop, braking at b_max at most. The bracket plus means the distance is never negative. It is a worst case: at 130 km/h it asks for about 300 m of perception, an emergency that the minimal risk maneuver handles, and far too restrictive for a regulation such as Keep Lane with its ACC, or for a lane change.",
      backups: ["v-rss", "b-rss"],
      html: `<div class="card col" style="gap:6px;padding:24px 40px"><h4 style="margin:0">RSS · Responsibility-Sensitive Safety, Mobileye (Intel) ${R("shwartz2017RSS")}</h4>
          <p style="margin:0;font-size:28px">The rear vehicle never hits the front one, even if it <b>brakes as hard as possible until it stops</b></p></div>
        <div class="card eqbox" style="padding:26px 30px"><div class="eq" style="font-size:44px;text-align:center"><i>d</i><sub>min</sub><sup>RSS</sup> = [ <span class="rssa"><i>v<sub>r</sub> ρ</i> + ½ <i>a</i><sub>max</sub><i>ρ</i><sup>2</sup></span> + <span class="rssb"><span class="fr"><span>(<i>v<sub>r</sub></i> + <i>ρ a</i><sub>max</sub>)<sup>2</sup></span><span>2 <i>b</i><sub>min</sub></span></span></span> − <span class="rssc"><span class="fr"><span><i>v<sub>f</sub></i><sup>2</sup></span><span>2 <i>b</i><sub>max</sub></span></span></span> ]<sub>+</sub></div></div>
        <div class="g3 grow">
          <div class="card col rssa" data-step="1" style="gap:8px;justify-content:center"><h4 style="margin:0">1 · The response</h4><p style="margin:0;font-size:25px">During its response time <i class="m">ρ</i>, the rear vehicle at <i class="m">v<sub>r</sub></i> may still accelerate at <i class="m">a</i><sub>max</sub></p></div>
          <div class="card col rssb" data-step="2" style="gap:8px;justify-content:center"><h4 style="margin:0">2 · The rear vehicle brakes</h4><p style="margin:0;font-size:25px">From the speed it reached, braking at least at <i class="m">b</i><sub>min</sub></p></div>
          <div class="card col rssc" data-step="3" style="gap:8px;justify-content:center"><h4 style="margin:0">3 · Minus the front vehicle</h4><p style="margin:0;font-size:25px">Its stopping distance from <i class="m">v<sub>f</sub></i>, braking at most at <i class="m">b</i><sub>max</sub></p></div>
        </div>
        <div class="card bad tight" data-step="3"><p style="margin:0;font-size:26px">A worst case · ≈ 300 m at 130 km/h, too restrictive to <b>regulate</b> or to change lane</p></div>` },

    { id: "dreq", cite: ["CARDENAS2025162", "bussemaker2014SensingRF"], sec: "c1", c: ["C1"], kicker: "Sense skill · the required perception range", time: 70, steps: 2,
      title: "From stopping to settling in, how far must the vehicle see?",
      notes: "We keep the RSS principle with two changes, from our IFAC paper. First, the front vehicle does not stop: it slows down to a fraction R of its speed, for instance 80 percent. The rear vehicle reacts as in RSS, then decelerates comfortably until it reaches the same speed. Second, once both drive at that speed, the rear vehicle still keeps a time gap T, 2 seconds as in the French road code. This is a regulation, what Keep Lane with its ACC does, and a smooth insertion for a lane change. The result is the perception range required, d_req. (1) The same rule gives each zone its boundary, with the roles swapped. Ahead, in zones B and C, the ego vehicle is the rear vehicle: the first boundary, how far we must see ahead. Behind, in zone A, the car approaching in the target lane is the rear vehicle: the second boundary, how far we must see behind. (2) The Sense skill holds when the perception envelope covers the requirement in every zone. And the parameters can follow the OD too: braking capabilities change with rain or friction.",
      backups: ["b-rss"],
      html: `<div class="row grow">
        <div class="col" style="flex:1.15 1 0;gap:26px;justify-content:center">
          <div class="g2">
            <div class="card tight col" style="gap:4px"><h4 style="margin:0">The front vehicle slows down</h4><p style="margin:0;font-size:25px">to a fraction <i class="m">R</i> of its speed, it does not stop</p></div>
            <div class="card tight col" style="gap:4px"><h4 style="margin:0">Then a time gap</h4><p style="margin:0;font-size:25px">the rear vehicle keeps <i class="m">T</i> behind it</p></div></div>
          <div class="card eqbox" style="padding:22px 26px"><div class="eq" style="font-size:40px;text-align:center"><i>d</i><sub>req</sub> = <i>T R v<sub>f</sub></i> + <i>d</i><sub>min</sub><sup>RSS</sup>( <i>v<sub>r</sub></i> − <i>R v<sub>f</sub></i> , (1 − <i>R</i>) <i>v<sub>f</sub></i> )</div>
            <div class="lgd" style="margin-top:10px"><span class="s"><i>T R v<sub>f</sub></i></span><span>the time gap, at the final speed</span><span class="s"><i>d</i><sub>min</sub><sup>RSS</sup>(…)</span><span>RSS, relative to the final speed <i class="m">R v<sub>f</sub></i></span></div></div>
          <div class="card navy tight" style="text-align:center"><p style="margin:0;font-size:28px">A <b>regulation</b>, as Keep Lane with its ACC, and a <b>smooth insertion</b></p></div>
        </div>
        <div class="col" style="flex:0.85 1 0;gap:16px">
          <div class="card col grow" data-step="1" style="gap:8px">${fig("zones.jpg", "Zones A, B and C of the lane change")}
            <p style="margin:0;font-size:24px"><b>Ahead</b>, B and C · the ego vehicle is the rear one<br><b>Behind</b>, A · the car behind is the rear one</p></div>
          <div class="card eqbox" data-step="2"><div class="eq" style="font-size:27px;text-align:center"><i>f</i><sub>veh</sub>(<i>S</i>) = 1 ⇔ <i>d</i><sub>PE</sub><sup><i>z</i></sup> ≥ <i>d</i><sub>req</sub><sup><i>z</i></sup>, ∀<i>z</i> ∈ {A, B, C}</div>
            <div class="xs mute" style="text-align:center">The perception envelope covers every zone ${R("bussemaker2014SensingRF")}</div></div>
        </div></div>` },

    { id: "v-window", type: "video", sec: "c1", c: ["C1"], time: 65,
      title: "The lane change window closes in the fog",
      notes: "Now we know the boundaries; how can the vehicle move with respect to them? The perception range required in the three zones defines a window of speeds for the lane change: going faster asks more ahead and less behind, going slower the opposite. Fog shrinks the perception envelope, so the window narrows until it closes. Then the lane change is no longer ensured, but Keep Lane, which only needs the zone ahead, remains ensured at a lower speed: partial operability. What matters is to stay, in degraded mode, with the largest number of ensured maneuvers. An uncertainty margin on the traffic speed raises the limit.",
      video: { src: A + "window.mp4?v=2", parts: [[0.0, "Required perception range: one RSS rule, three zones"], [6.0, "Speed trades the rear zone against the front zones"], [14.5, "Above both curves, the lane change is ensured"], [18.5, "Fog shrinks the envelope: the speed window narrows"], [27.0, "Too slow or too fast: a zone is no longer covered"], [36.0, "Below a visibility limit: Keep Lane ensured, lane change not ensured"], [46.5, "Uncertainty on the traffic speed: the limit rises"]] } },

    { id: "bridge-c1", type: "bridge", sec: "c1", dark: true, kicker: "Limitation", time: 30,
      title: "Ensured now, but what about the states the decision leads to?",
      notes: "The MCE answers a question about one state. A decision is a sequence: a maneuver ensured now can lead to a state where nothing is ensured, as in the problem shown at the start. This is the second contribution.",
      html: `<div class="bridge"><div class="k">Limitation of the assessment alone</div>
        <div class="q">Ensured now, but what about the states the decision leads to?</div>
        <ul class="chk"><li class="y">The MCE tells which maneuvers are ensured, in any state</li>
          <li class="n">Ensured now can lead to no fallback later, ${go("v-problem-a", "as in the problem")}</li></ul>
        <a class="next" data-go="sec-c2" href="#/sec-c2"><span class="cbadge solid">ODD-MDP</span> Which sequence of ensured maneuvers to choose? →</a></div>` },

    // ================================================================ 4. C2 · choice: ODD-constrained MDP
    { id: "sec-c2", type: "section", sec: "c2", dark: true, title: "ODD-MDP", time: 10 },

    { id: "odd-mdp", cite: ["bellman1957MDP", "11097482"], sec: "c2", c: ["C2"], kicker: "Formalism", time: 80,
      title: "In the ODD-MDP, capability enters the Bellman equation",
      notes: "Why an MDP. It represents sequential decisions over a horizon. It handles uncertainty in the transitions and extends to partial observability, which the third contribution uses. Tactical maneuvers form a discrete set of actions. And its elements can be tuned from data, as in reinforcement learning. The state joins the operational domain, the ego vehicle and the surrounding vehicles: including the OD is what lets the filter and the reward depend on the context. An action pairs a maneuver with a set speed change. The MCE returns the ensured actions of a state, in every predicted state. The only change to the Bellman equation: the maximum runs over the ensured actions. Capability precedes choice is written into the equation, and the policy is ODD-compliant by construction, not by verification.",
      html: `<div class="row" style="gap:24px">
          <div class="card col" style="flex:0.78 1 0;gap:10px"><h4>Why an MDP ${R("bellman1957MDP")}</h4><ul class="chk small" style="gap:10px">
            <li class="y">Sequential decisions over a horizon</li>
            <li class="y">Uncertain transitions, extends to partial observability (${go("sec-c3", "C3")})</li>
            <li class="y">Maneuvers form a discrete set of actions</li>
            <li class="y">Elements tunable from data, as in reinforcement learning</li></ul></div>
          <div class="card grow defs">
            <span class="pill">Model</span><div class="eq"><i>M</i> = (<i>S</i>, <i>A</i>, <i>P</i>, <i>R</i>, <i>γ</i>)</div>
            <span class="pill">State</span><div class="eq"><i>S</i> = OD × <i>p</i><sub>ego</sub> × {<i>p<sub>i</sub></i>}<sub><i>i</i>=1</sub><sup><i>N</i></sup>, &nbsp; <i>p<sub>i</sub></i> = (<i>x<sub>i</sub></i>, <i>ẋ<sub>i</sub></i>, <i>ẍ<sub>i</sub></i>, <i>y<sub>i</sub></i>, <i>ẏ<sub>i</sub></i>, <i>ÿ<sub>i</sub></i>)</div>
            <span class="pill">Actions</span><div class="eq"><i>A</i> = {KL, INC, DEC, LCL, LCR, MRM}</div>
            <span class="pill ok">Capability</span><div class="eq"><i>g</i>(<i>s</i>) = ${Aens()} ⊆ <i>A</i> &nbsp;<span class="xs mute" style="font-family:Montserrat,sans-serif">the MCE, in every predicted state</span></div>
          </div></div>
        <div class="card bellman">
          <div class="eq big"><i>V</i>*(<i>s</i>) = <span class="lim"><span class="o hcho">max</span><span class="u hcap"><i>a</i> ∈ ${Aens()}</span></span> [ <i>R</i>(<i>s</i>, <i>a</i>) + <i>γ</i> Σ<sub><i>s</i>′</sub> <i>P</i>(<i>s</i>′ | <i>s</i>, <i>a</i>) <i>V</i>*(<i>s</i>′) ]
            <span style="display:inline-block;width:60px"></span><i>π</i>*(<i>s</i>) = <span class="lim"><span class="o hcho">argmax</span><span class="u hcap"><i>a</i> ∈ ${Aens()}</span></span> <i>Q</i>*(<i>s</i>, <i>a</i>)</div>
          <div class="legend"><span><i class="sw cho"></i><b>Choice</b> over the whole horizon</span><span><i class="sw cap"></i><b>Capability</b>, only ensured maneuvers</span></div></div>
        <div class="takeaway"><b>ODD-compliant by construction</b>, not by verification ${R("11097482")}</div>` },

    { id: "v-search", type: "video", sec: "c2", c: ["C2"], time: 55,
      title: "The search tree of the ODD-MDP",
      notes: "Deciding means exploring possible futures as a tree. (1) Every action leads to a predicted state, and the MCE checks that state. Inside the ODD it is ensured, and the search expands it. Beyond the barrier, outside the ODD, it is not ensured: it is not expanded, and none of its own futures is ever computed. (2) Level after level, up to the horizon, only the ensured states are expanded. (3) What we gain: everything in red is what would have hung from those states, explored for nothing without the MCE. With it, that time is never spent: the search narrows like a funnel. (4) Among the ensured futures, the best sequence. (5) Only the first action is executed, and the search starts again.",
      // two parts: the whole search in one go, then a pause before the receding horizon (the process repeats)
      video: { src: A + "search.mp4?v=3", parts: [[0.0, "The search tree of the ODD-MDP"], [38.6, "Execute the first action, then explore again"]] } },

    { id: "mdp-solve", cite: ["bellman1957dynamic"], sec: "c2", c: ["C2"], kicker: "Transition and resolution", time: 70,
      title: "Predict the next states, then solve the tree by value iteration",
      notes: "Two steps. First the transition: for each ensured action, the state predictor gives the next state, and the state has two parts. The scene: the ego vehicle follows the kinematics of its maneuver, with its ACC behind a leader, and the surrounding vehicles keep a constant acceleration in their lane, without interactions. And the operational domain: what it will be at the predicted position and time, the fog ahead for instance, comes from the electronic horizon and V2X; the planner uses this forecast, it does not compute it. The MCE is called again on each predicted state, which builds the tree of ensured state-action pairs. Second, the resolution: value iteration on that tree. Three advantages. The whole MDP is known, since we built it, so value iteration gives the optimal values exactly. The maximum runs over the ensured actions only, so the policy is ODD-compliant by construction: nothing has to be checked afterwards. And the tree, pruned by the MCE, stays small enough to be solved at every planning cycle; only the first action is executed.",
      backups: ["b-transition", "b-vi"],
      html: `<div class="row grow">
        <div class="card col" style="flex:1.05 1 0;gap:12px"><h4>Transition after each ensured action</h4>
          <div class="tpair">
            <figure><img src="${F}arch_e3in.jpg" alt="Current state, with a lane change to the left"><figcaption>State <i class="m">S<sub>t</sub></i> and an ensured action <i class="m">a</i></figcaption></figure>
            <span class="tpa">→</span>
            <figure><img src="${F}arch_e3out.jpg" alt="Predicted state after the lane change, fog ahead"><figcaption>Predicted state <i class="m">Ŝ</i><sub><i class="m">t</i>+1</sub><sup><i class="m">a</i></sup></figcaption></figure></div>
          <div class="eqbox"><div class="eq" style="font-size:30px"><i>Ŝ</i><sub><i>t</i>+1</sub><sup><i>a</i></sup> = <i>f</i>(<i>S<sub>t</sub></i>, <i>a</i>), &nbsp; <i>a</i> ∈ ${Aens("S<sub>t</sub>")}, &nbsp; <i>S</i> = OD × scene</div></div>
          <div class="tprow"><span class="pill">Scene</span><span>Ego follows its maneuver, the others keep their lane</span></div>
          <div class="tprow"><span class="pill ok">OD</span><span>Read ahead from the electronic horizon</span></div>
          <p class="xs mute" style="margin:0">The MCE checks every predicted state</p></div>
        <div class="card col" style="flex:0.95 1 0;gap:12px"><h4>Value iteration on the tree ${R("bellman1957dynamic")}</h4>
          <div class="eqbox" style="text-align:left"><div class="eq" style="font-size:28px"><i>V</i>(<i>s</i>) ← max<sub><i>a</i> ∈ ${Aens()}</sub> [ <i>R</i>(<i>s</i>, <i>a</i>) + <i>γ</i> Σ<sub><i>s</i>′</sub> <i>P</i>(<i>s</i>′ | <i>s</i>, <i>a</i>) <i>V</i>(<i>s</i>′) ]</div>
            <div class="eq" style="font-size:28px"><i>a<sub>t</sub></i> = argmax<sub><i>a</i> ∈ ${Aens("s<sub>0</sub>")}</sub> <i>Q</i>(<i>s</i><sub>0</sub>, <i>a</i>)</div></div>
          <h4 style="margin-top:4px">Why value iteration</h4>
          <ul class="list" style="font-size:24px;gap:12px">
            <li><b>Exact</b>, the whole tree is known</li>
            <li><b>ODD-compliant by construction</b></li>
            <li><b>Fast</b>, the MCE prunes the tree</li></ul></div>
        </div>` },
    { id: "reward", cite: ["WANG2021surrogate", "glaser2010ttctiv"], sec: "c2", c: ["C2"], kicker: "Reward function", time: 70,
      title: "Among the ensured maneuvers, the reward ranks the options",
      notes: "Five objectives: safety, legal compliance, progress, the route, and operability. The first terms are classical. The operability terms are what makes the policy anticipate. The first one counts the ensured actions, each weighted by its margin to the boundary of its most constrained skill: the planner prefers states where the remaining maneuvers are comfortably ensured. The second one penalizes predicted states, beyond a time threshold, from which no minimal risk maneuver is reachable, more as they are later. The weights put collision first, then the reachable fallback, then operability. And because the model is explicit and the reward is a sum of named terms, every decision can be explained: compared with simply keeping the lane, term by term, now and over the horizon, which gives its main reason and what it costs. The details are in the appendix.",
      backups: ["b-reward", "b-fallback"],
      html: `<div class="card eqbox" style="padding:14px 24px 10px"><div class="eq" style="font-size:29px"><i>R</i>(<i>s</i>) = <span class="grp"><span><i>W</i><sub>col</sub><i>R</i><sub>col</sub> + <i>W</i><sub>risk</sub><i>R</i><sub>risk</sub></span><span class="lab">safety</span></span> + <span class="grp"><span><i>W</i><sub>legal</sub><i>R</i><sub>legal</sub></span><span class="lab">legal</span></span> + <span class="grp"><span><i>W</i><sub>speed</sub><i>R</i><sub>speed</sub></span><span class="lab">progress</span></span> + <span class="grp"><span><i>W</i><sub>route</sub><i>R</i><sub>route</sub></span><span class="lab">route</span></span> + <span class="grp op"><span><i>W</i><sub>op</sub><i>R</i><sub>op</sub> + <i>W</i><sub>time</sub><i>R</i><sub>time</sub></span><span class="lab">operability</span></span></div></div>
        <div class="row grow">
          <table class="tbl" style="flex:1 1 0;font-size:21px"><tr><th style="width:150px">Term</th><th>Definition</th></tr>
            <tr><td><b>Collision</b></td><td><span class="eq" style="font-size:25px"><i>R</i><sub>col</sub>(<i>s</i>) = −𝟙<sub>col</sub>(<i>s</i>)</span></td></tr>
            <tr><td><b>Risk</b></td><td><span class="eq" style="font-size:25px">TTC<sub><i>i</i></sub> = <i>d<sub>i</sub></i> / (<i>v</i><sub>ego</sub> − <i>v<sub>i</sub></i>), &nbsp;TIV<sub><i>i</i></sub> = <i>d<sub>i</sub></i> / <i>v</i><sub>ego</sub></span> ${R("WANG2021surrogate", "glaser2010ttctiv")}</td></tr>
            <tr><td><b>Legal</b></td><td>excess over the speed limit</td></tr>
            <tr><td><b>Progress</b></td><td><span class="eq" style="font-size:25px"><i>R</i><sub>speed</sub>(<i>s</i>) = <i>v</i><sub>ego</sub> / <i>v</i><sub>max</sub></span></td></tr>
            <tr><td><b>Route</b></td><td>lane of the itinerary, near the next event</td></tr></table>
          <div class="col" style="flex:1.05 1 0">
            <div class="card ok tight"><h4>Loss of ensured maneuvers</h4><div class="eq" style="font-size:29px"><i>R</i><sub>op</sub>(<i>s</i>) = −( 1 − <sup>1</sup>⁄<sub>|<i>A</i>|</sub> Σ<sub><i>a</i> ∈ ${Aens()}</sub> <i>w<sub>a</sub></i>(<i>s</i>) )</div>
              <p class="xs mute" style="margin:0"><i class="m">w<sub>a</sub></i>, the margin of the most constrained skill</p></div>
            <div class="card ok tight"><h4>Fallback availability</h4><div class="eq" style="font-size:29px"><i>R</i><sub>time</sub>(<i>s</i>) = −[ <i>t</i><sub>pred</sub>(<i>s</i>) − <i>T</i><sub>thr</sub> ]<sub>+</sub> ( 1 − 𝟙<sub>MRM</sub>(<i>s</i>) )</div>
              <p class="xs mute" style="margin:0">no reachable MRM beyond <i class="m">T</i><sub>thr</sub> is penalized</p></div>
            <div class="card tight" style="text-align:center"><div class="eq" style="font-size:28px"><i>W</i><sub>col</sub> ≫ <i>W</i><sub>time</sub> &gt; <i>W</i><sub>op</sub> &gt; <i>W</i><sub>risk</sub> &gt; <i>W</i><sub>legal</sub> &gt; <i>W</i><sub>speed</sub></div></div>
            <div class="card navy tight xhint"><h4>Model-based, so every decision can be explained</h4>
              <p>Against <b>keep lane</b>, term by term, its <b>main reason</b> and its <b>trade-off</b> ${go("b-explain", "Appendix →")}</p></div>
          </div></div>` },

    { id: "safe", cite: ["sae2021taxonomy", "iso2020iso4804"], sec: "c2", c: ["C2"], kicker: "Safe states and fail-operational strategies", time: 60,
      title: "The policy always keeps a minimal risk condition within reach",
      notes: "The fail-operational property, made explicit. A minimal risk maneuver, MRM, brings the vehicle to a minimal risk condition, such as stopped on the hard shoulder. A state is safe when the MRM is ensured from it. The planner does not fall back by default: it keeps operating, and keeps a way to a minimal risk condition open. The term R_time penalizes the predicted states, beyond a time threshold, from which no MRM can be reached, more and more as they get further. Two mechanisms act together: the filter excludes what is not ensured, and the reward prefers the plans that keep margin and an MRM within reach. On the right, the same idea as in the animation of the introduction: the plan keeps a way to a minimal risk condition.",
      backups: ["b-mrm", "b-fallback"],
      html: `<div class="row grow">
        <div class="col" style="flex:0.95 1 0;gap:16px">
          <div class="card col" style="gap:8px"><h4>Safe state</h4>
            <div class="eqbox"><div class="eq" style="font-size:30px"><i>s</i> ∈ <i>S</i><sub>safe</sub> ⇔ MRM ∈ ${Uens("s")}</div></div>
            <p class="small" style="margin:0">The MRM is ensured, and leads to a <b>minimal risk condition</b> ${R("sae2021taxonomy", "iso2020iso4804")}</p></div>
          <div class="card col" style="gap:8px"><h4>Kept within reach by the reward</h4>
            <div class="eqbox"><div class="eq" style="font-size:28px"><i>R</i><sub>time</sub>(<i>s</i>) = −[ <i>t</i><sub>pred</sub>(<i>s</i>) − <i>T</i><sub>thr</sub> ]<sub>+</sub> ( 1 − 𝟙<sub>MRM</sub>(<i>s</i>) )</div></div>
            <p class="small" style="margin:0">No reachable MRM beyond <i class="m">T</i><sub>thr</sub>, penalized more as it gets further</p></div>
          <div class="card col grow" style="gap:8px"><h4>Two mechanisms act together</h4><ul class="list small">
            <li>The <b>filter</b> excludes what is not ensured</li>
            <li>The <b>reward</b> prefers the plans that keep margin and an MRM within reach</li></ul>
            <p class="small navyt" style="margin:4px 0 0"><b>The filter alone does not anticipate. The reward alone does not exclude.</b></p></div>
        </div>
        <div class="card col" style="flex:1.05 1 0;gap:16px;justify-content:center"><h4>The plan keeps a way to a minimal risk condition</h4>
          <img src="${F}mrc_policy.jpg" alt="The policy, highlighted in green, can always reach a minimal risk condition" style="width:100%;border-radius:12px"></div>
        </div>` },
    { id: "bridge-c2", type: "bridge", sec: "c2", dark: true, kicker: "Limitation", time: 30,
      title: "What if the perceived state is wrong?",
      notes: "The ODD-MDP decides among ensured maneuvers and keeps a fallback reachable over the whole horizon. But it takes the perceived state as exact. Positions and speeds are noisy, the fog forecast can be wrong, and the intentions of the other drivers are hidden. The third contribution keeps the same principle under this uncertainty.",
      html: `<div class="bridge"><div class="k">Limitation of the ODD-MDP</div>
        <div class="q">What if the perceived state is wrong?</div>
        <ul class="chk"><li class="y">Choice among ensured maneuvers, a fallback within reach</li>
          <li class="n">The perceived state is taken as exact</li>
          <li class="to">Keep capability before choice when the state is uncertain</li></ul>
        <a class="next" data-go="sec-c3" href="#/sec-c3"><span class="cbadge solid">ODD-POMDP</span> What if the information is uncertain? →</a></div>` },

    // ================================================================ 5. C3 · choice under uncertainty: ODD-constrained POMDP
    { id: "sec-c3", type: "section", sec: "c3", dark: true, title: "ODD-POMDP", time: 10 },

    { id: "rw-c3", cite: ["hubmann2018uncertainty", "chen2025intention", "ulbrich2015pomdp", "zhang2020efficient", "silver_monte-carlo_2010", "hoel2019combiningdeep"], sec: "c3", c: ["C3"], kicker: "Related work · partial observability", time: 60,
      title: "How do POMDP planners handle uncertainty?",
      notes: "POMDPs are the standard frame for tactical decisions under partial observability: lane changes, merging, intersections. Online Monte Carlo search with belief updates makes them tractable, and POMCP represents the belief with particles. What they keep uncertain is the traffic. The capability of the vehicle is assessed, at best, in the current state. The ODD-POMDP adds the capability check in every particle.",
      html: `<div class="card tight col grow" style="gap:8px">${fig("rw_pomdp.png", "Partially observable driving scenarios")}
          <p class="xs mute" style="margin:0;text-align:center">${R("hubmann2018uncertainty", "chen2025intention", "ulbrich2015pomdp", "zhang2020efficient", "silver_monte-carlo_2010", "hoel2019combiningdeep")}</p></div>
        <div class="g2">
          <div class="card ok"><h3 style="margin:0">Uncertain traffic ✓</h3></div>
          <div class="card bad"><h3 style="margin:0">Uncertain capability ✗</h3></div>
        </div>` },

    { id: "pomdp-sources", sec: "c3", c: ["C3"], kicker: "Extension to partial observability", time: 55,
      title: "Three sources of uncertainty",
      notes: "Three sources, which do not play the same role. First, the surrounding vehicles: their position and speed are measured with noise, which grows as the perception envelope degrades, and it changes which gap looks acceptable. Second, the visibility forecast: where the fog starts and how dense it is may differ from what is announced; it enters the skills, so this is where the capability reasoning matters most. Third, the tactical intentions of the other drivers, such as a cut-in: they stay hidden whatever the sensor quality. All three are carried by one belief, represented with particles. The experiments for each are in the appendix.",
      backups: ["r-noisy", "r-forecast", "r-cutin"],
      html: `<div class="col grow" style="gap:16px">
          ${[["1", "Surrounding vehicles", "unc_noisy.png", "Noisy position and speed"],
             ["2", "Visibility forecast", "unc_forecast.png", "Where the fog starts, how dense"],
             ["3", "Tactical intentions", "unc_intent.png", "Will a car cut in?"]]
            .map(([n, t, img, u]) => `<div class="card row" style="flex:1 1 0;min-height:0;gap:34px;align-items:center;padding:14px 34px">
              <div class="num-badge">${n}</div>
              <div class="col" style="flex:0 0 520px;gap:6px"><h3 style="margin:0;font-size:38px">${t}</h3><p style="margin:0;font-size:28px">${u}</p></div>
              <div style="flex:1;align-self:stretch;min-height:0;display:flex;justify-content:center"><img src="${F}${img}" alt="${t}" style="height:100%;max-width:100%;object-fit:contain;border-radius:10px"></div></div>`).join("")}
        </div>
        <div class="card navy tight" style="text-align:center"><p style="margin:0;font-size:30px">One <b>belief</b>, represented with particles</p></div>` },

    { id: "pomdp", cite: ["silver_monte-carlo_2010", "murphy2012machine"], sec: "c3", c: ["C3"], kicker: "Formalism", time: 60,
      title: "In the ODD-POMDP, a belief replaces the state",
      notes: "The POMDP adds the observations and their model to the tuple. The vehicle no longer knows the state: it maintains a belief, represented by particles. The observations are the estimated kinematic states of the surrounding vehicles, Gaussian around the true state, and their intentions, estimated by a Gaussian naive Bayes classifier on four features. Each element of the ODD-MDP has its counterpart. The ensured set is now defined on the belief: an action is kept when the share of particles in which it is ensured reaches the threshold tau, an explicit design parameter; the guarantee becomes probabilistic. Value iteration gives way to Monte Carlo planning. Capability still precedes choice, now in probability.",
      html: `<div class="row" style="gap:24px">
          <div class="card defs grow">
            <span class="pill">Model</span><div class="eq">𝒫 = (<i>S</i>, <i>A</i>, <i>T</i>, <i>R</i>, <i>O</i>, <i>Z</i>, <i>γ</i>)</div>
            <span class="pill">Belief</span><div class="eq"><i>b<sub>t</sub></i> ≈ {<i>s<sub>t</sub></i><sup>(<i>i</i>)</sup>}<sub><i>i</i>=1</sub><sup><i>N</i></sup> &nbsp;<span class="xs mute" style="font-family:Montserrat,sans-serif">particles</span> ${R("silver_monte-carlo_2010")}</div>
            <span class="pill">Observation</span><div class="eq"><i>o<sub>t</sub></i> = {(<i>p̂<sub>i</sub></i><sup>kin</sup>(<i>t</i>), <i>û<sub>i</sub></i>(<i>t</i>))}<sub><i>i</i>=1</sub><sup><i>N</i><sub>veh</sub></sup>, &nbsp; <i>p̂<sub>i</sub></i><sup>kin</sup> ~ 𝒩(<i>p<sub>i</sub></i><sup>kin</sup>, <i>Σ<sub>i</sub></i>)</div>
            <span class="pill">Intention</span><div class="eq"><i>P</i>(<i>u</i> | <i>z</i>) ∝ <i>P</i>(<i>u</i>) Π<sub><i>k</i>=1</sub><sup>4</sup> 𝒩(<i>z<sub>k</sub></i> | <i>μ<sub>u,k</sub></i>, <i>σ</i><sup>2</sup><sub><i>u,k</i></sub>) ${R("murphy2012machine")}</div>
            <span class="pill ok">Ensured</span><div class="eq"><i>P</i>(<i>a</i> ensured | <i>b<sub>t</sub></i>) ≈ <sup>1</sup>⁄<sub><i>N</i></sub> Σ<sub><i>i</i></sub> 𝟙[<i>a</i> ∈ ${Aens("s<sub>t</sub><sup>(i)</sup>")}] ≥ <i>τ</i> &nbsp;<span class="xs mute" style="font-family:Montserrat,sans-serif">share of particles</span></div>
          </div></div>
        <table class="tbl grow" style="font-size:22px"><tr><th style="width:230px"></th><th>ODD-MDP</th><th>ODD-POMDP</th></tr>
          <tr><td><b>State</b></td><td>fully observed, <i class="m">s</i></td><td>belief over particles, <i class="m">b<sub>t</sub></i></td></tr>
          <tr class="hl"><td><b>Capability</b></td><td><span class="eq" style="font-size:25px">${Aens()}</span></td><td><span class="eq" style="font-size:25px">${Aens("b<sub>t</sub>")} = {<i>a</i> | <i>P</i>(<i>a</i> ensured | <i>b<sub>t</sub></i>) ≥ <i>τ</i>}</span></td></tr>
          <tr><td><b>Choice</b></td><td>value iteration</td><td>POMCP among the ensured actions</td></tr>
          <tr><td><b>Uncertainty</b></td><td>in the transitions</td><td>noise, fog forecast, intentions</td></tr></table>
        <div class="takeaway"><b>Capability precedes choice</b>, now in probability</div>` },

    { id: "v-pomcp-a", type: "video", sec: "c3", c: ["C3"], time: 45,
      title: "The belief, and an action ensured for a share τ of the particles",
      notes: "The current state is only estimated: noisy position and speed, uncertain intentions, an uncertain fog forecast. The belief keeps several possible states, the particles. The MCE checks the action in every particle: it is ensured only if a share τ of the particles ensures it.",
      video: { src: A + "pomcp.mp4", parts: [[0.0, "Under uncertainty, the current state becomes a belief"], [19.0, "An action is ensured when a share τ of the particles ensures it"]], end: 30.6 } },

    { id: "v-pomcp-b", type: "video", sec: "c3", c: ["C3"], time: 55,
      title: "The ODD-constrained Monte Carlo search",
      notes: "Each simulation draws one particle and follows ensured actions up to the horizon. Simulation after simulation, the tree grows toward the most promising ensured actions. Only the best ensured action is executed, the belief is rebuilt and the search starts again.",
      video: { src: A + "pomcp.mp4", parts: [[30.6, "Monte Carlo search: one simulation at a time"], [46.0, "Many simulations: the tree grows where it matters"], [59.37, "Execute the best ensured action, rebuild the belief, search again"]] } },

    // ================================================================ 6. C4 · validation in simulation and on the vehicle
    { id: "sec-c4", type: "section", sec: "c4", dark: true, title: "Validation", time: 10 },

    { id: "setup", cite: ["renault2022cta", "ipgCarMaker"], sec: "c4", c: ["C4"], kicker: "Experimental platform", time: 50,
      title: "The same planner, from simulation to a real prototype",
      notes: "Three loops that progressively replace simulated elements by real ones: software-in-the-loop, everything simulated in IPG CarMaker; vehicle-in-the-loop, a real vehicle on a test track with virtual traffic; and the real vehicle. The results that follow come from the software-in-the-loop, except the overtaking and the fog on the prototype, which are vehicle-in-the-loop. In both, ODD-aptive runs unchanged. The prototype is a Mégane E-Tech; it cannot be shown for confidentiality reasons, so this is a reference image of the model. The tests ran on the CTA2 track of the Centre Technique d'Aubevoye, Renault Group, in Normandy.",
      html: `<div class="row grow">
        <div class="card col" style="flex:1.05 1 0;gap:14px">${fig("v_cycle.png", "Validation loops")}
          <div class="row" style="gap:10px;flex-wrap:wrap;justify-content:center">
            <span class="pill line"><b>SIL</b> · software-in-the-loop</span><span class="pill line"><b>VIL</b> · vehicle-in-the-loop</span><span class="pill line">Real vehicle</span></div></div>
        <div class="col" style="flex:1 1 0;gap:16px">
          <div class="card tight col" style="flex:1.15 1 0;gap:8px;min-height:0"><div style="flex:1;min-height:0;display:flex;justify-content:center"><img src="${F}cta_test_track.png" alt="Aerial view of the Centre Technique d'Aubevoye" style="height:100%;max-width:100%;object-fit:contain;border-radius:10px"></div>
            <p class="xs mute" style="margin:0;text-align:center">CTA test track, Aubevoye ${R("renault2022cta")}</p></div>
          <div class="row" style="flex:1 1 0;gap:16px;min-height:0">
            <div class="card tight col" style="flex:1 1 0;gap:8px;min-height:0"><div style="flex:1;min-height:0;display:flex;justify-content:center"><img src="${F}prototype_megane.png" alt="Reference image of the Mégane E-Tech" style="height:100%;max-width:100%;object-fit:contain;border-radius:10px"></div>
              <p class="xs mute" style="margin:0;text-align:center">Mégane E-Tech · reference image</p></div>
            <div class="col" style="flex:1 1 0;gap:16px">
              <div class="card tight stat grow" style="justify-content:center"><span class="v" style="font-size:34px">IPG CarMaker ${R("ipgCarMaker")}</span><span class="l">road, traffic, weather</span></div>
              <div class="card tight stat grow" style="justify-content:center"><span class="v" style="font-size:34px">200–300 ms</span><span class="l">replanning period</span></div>
            </div></div>
        </div></div>` },

    { id: "v-vil", type: "video", sec: "c4", c: ["C4"], time: 95,
      title: "Long-term overtaking on the prototype vehicle",
      notes: "The strongest evidence of the defense: a real vehicle executing the decisions. Let the video run without talking over it for the first seconds.",
      video: { src: V + "vil.mp4", parts: [[12.0, "A real vehicle, with virtual traffic"], [21.25, "Is returning to the right lane worthwhile?"], [33.0, "The run: one overtaking sequence past the whole group"]] } },

    { id: "v-vil-fog", type: "video", sec: "c4", c: ["C2", "C4"], time: 85,
      title: "Anticipating fog on the prototype vehicle",
      notes: "The same anticipation, now on the real prototype on the CTA2 track, with a virtual fog zone. The electronic horizon announces the fog; the question is when to slow down. ODD-aptive adapts before reaching the fog, while the lane change is still ensured, instead of reacting at the boundary. The message is qualitative: the decision anticipates the loss of capability on a real vehicle.",
      // v3, without pauses: one part; the presenter pauses it (K or the scene bar) where wanted
      video: { src: V + "vil_fog.mp4?v=3", parts: [[10.0, "Anticipating fog on the prototype vehicle"]] } },

    { id: "fog-a", sec: "c4", c: ["C2", "C4"], kicker: "Scenario 1: reduced visibility · configuration A", time: 60,
      title: "With four steps, no MRM before the fog in 100 of 100 runs",
      notes: "Configuration A. With one step, the set speed stays at 130 km/h until about 170 m before the fog and every run ends with an MRM. With four steps, the deceleration starts before the 300 m ramp: the vehicle reacts to the forecast degradation, not to the observed one. No collision in the 400 runs. The margin lowers the entry speed without a second boundary.",
      backups: ["b-margin", "b-conf"],
      html: `<div class="row grow">
        <div class="card col tight" style="flex:0.42 1 0">${fig("fog_config_a.png", "Fog scenario, configuration A")}</div>
        <div class="col grow">
          <div class="card small tight">Fog ≈ 2.5 km ahead, range 200 → 50 m, no traffic<br>Reference <b>one step</b> (3.5 s) · ODD-aptive <b>four steps</b> (14 s)</div>
          <table class="tbl"><tr><th>Planner</th><th class="c">Runs without MRM</th><th class="c">First deceleration before the fog</th><th class="c">Speed at fog entry</th></tr>
            <tr><td>Reference, one step</td><td class="c badt"><b style="color:var(--bad)">0 / 100</b></td><td class="c">170 m (139–191)</td><td class="c">MRM at ≈ 115 km/h</td></tr>
            <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c"><b style="color:var(--ok)">100 / 100</b></td><td class="c">456 m (446–464)</td><td class="c">94.4 km/h (93.7–94.9)</td></tr>
            <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.2</td><td class="c"><b style="color:var(--ok)">100 / 100</b></td><td class="c">455 m (446–466)</td><td class="c">78.7 km/h (77.5–79.4)</td></tr>
            <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.5</td><td class="c"><b style="color:var(--ok)">100 / 100</b></td><td class="c">478 m (470–488)</td><td class="c">70.1 km/h (68.8–72.3)</td></tr></table>
          <div class="card tight grow">${fig("fog_speed_profiles.png", "Speed profiles before the fog")}</div>
        </div></div>` },

    { id: "v-exit", type: "video", sec: "c4", c: ["C2", "C4"], time: 140,
      title: "Scenario 2: preparing a highway exit",
      notes: "The hypotheses of the exit scenario, then a run of ODD-aptive: it keeps overtaking after the announcement and prepares the exit during the last kilometre.",
      video: { src: V + "exit.mp4", parts: [[12.0, "The electronic horizon announces the exit"], [19.0, "Slower traffic invites overtaking"], [27.75, "The exit is a route objective, not a rule"], [38.5, "Level 2: the driver remains the fallback"], [51.5, "Keep overtaking, then return in time"], [63.5, "The simulations, and how to read the display"], [80.75, "A run of ODD-aptive up to the exit"]] } },

    { id: "exit", sec: "c4", c: ["C2", "C4"], kicker: "Scenario 2: preparing a highway exit", time: 50,
      title: "The exit is taken in 100 of 100 runs, while still overtaking",
      notes: "The vehicle keeps overtaking after the announcement and prepares the exit during the last kilometre, with no rule imposing a lane at a given distance. The preparation emerges from the exploration of predicted states and from the reward.",
      backups: ["b-exit", "b-conf"],
      html: `<div class="row grow">
        <div class="card col tight" style="flex:0.7 1 0">${fig("exit_scenario.png", "Highway exit scenario")}</div>
        <div class="col grow">
          <div class="card small">Exit announced 2 km ahead, dense traffic<br>A <b>route objective</b> in the reward, not a rule</div>
          <div class="card tight grow">${fig("exit_lane_occupancy.png", "Lane occupancy before the exit")}</div>
          <div class="g4">
            <div class="card tight stat"><span class="v ok" style="font-size:30px">100 / 100</span><span class="l">exits taken</span></div>
            <div class="card tight stat"><span class="v" style="font-size:30px">40</span><span class="l">overtakings after the announcement</span></div>
            <div class="card tight stat"><span class="v" style="font-size:30px">1230 → 618 m</span><span class="l">first exit decision, then final return</span></div>
            <div class="card tight stat"><span class="v" style="font-size:30px">84 → 103 km/h</span><span class="l">mean speed, without then with overtaking</span></div>
          </div>
        </div></div>` },

    // ================================================================ 7. conclusion
    { id: "sec-concl", type: "section", sec: "concl", dark: true, title: "Conclusion and perspectives", time: 10 },

    { id: "evidence", sec: "concl", kicker: "General conclusion", time: 70,
      title: "From declaring the ODD to remaining within it",
      notes: "The ODD defines where a system is designed to operate, but declaring it does not guarantee that the system remains within it. When ODD compliance is considered, it is a monitor that validates the current action; it does not constrain future decisions, so a sequence of valid decisions can narrow operability until safe operation is no longer ensured. ODD-aptive brings the limits into the decision while it is built. (1) Deciding is treated as a capability in its own right: the driving task is decomposed into maneuvers, each capability through Sense, Think and Act and skill graphs; the loss of a maneuver is always traced to a change of context, the assessment works on predicted contexts, and it is modular, since skills are shared and new behaviors are composed. (2) In the ODD-MDP, the actions are restricted to the ensured maneuvers in every predicted state: the tree has no branch that leaves the ODD, and the operability terms keep margins and an MRM reachable. Both mechanisms are needed jointly. (3) In the ODD-POMDP, the same principle holds with uncertain vehicles, intentions and forecasts; the guarantee becomes probabilistic and its level a design parameter. (4) In simulation, anticipation changes the decisions and keeps the vehicle fail-operational when its capabilities degrade, without making it overly conservative; in nominal conditions, planning a sequence already improves the decisions; and it was shown on a prototype vehicle, in the loop.",
      html: `<ol class="nums concl grow">
          <li><b>Deciding is a capability</b><span>assessed now, and in the predicted states</span></li>
          <li><b>Only ensured maneuvers, over the whole horizon</b><span>no branch leaves the ODD, an MRM stays within reach</span></li>
          <li><b>The same principle under uncertainty</b><span>a belief, and a confidence threshold</span></li>
          <li><b>Fail-operational, without being overly conservative</b><span>in simulation, and on a prototype vehicle</span></li>
        </ol>` },

    { id: "perspectives", cite: ["kuhn2021introspective", "rabiee2023introspective", "krajewski2018highd", "alshiekh2018shielding", "krasowski2020safe"], sec: "concl", kicker: "Limitations and perspectives", time: 75,
      title: "Limitations, and where the work goes next",
      notes: "Limitations. The anticipation is only as good as the models of the dynamics, the perception and the traffic. The Act skills were assumed fulfilled, to keep the focus on the tactical decision. And the decisional capability needs the relevant ODD information within the horizon, here given by the electronic horizon, whose availability depends on connected infrastructure. Perspectives. First, the approach generalizes: new skills, maneuvers and objectives are added without changing the planner, so another domain, such as urban roads, means defining its skills, what is shared, and its behaviors. Act skills can monitor braking, steering and power. A maneuver can be monitored during its execution, to replan or abort it as soon as a condition changes. The capabilities can be learned from data, with introspective approaches. Richer traffic prediction, and naturalistic data such as highD. And learning the policy while keeping capability before choice, the ensured maneuvers acting as a shield. Beyond this, decisional capability gives a vocabulary that a certification process could examine.",
      html: `<div class="row grow">
        <div class="card bad col" style="flex:0.85 1 0"><h3>Limitations</h3><ul class="list">
          <li>Relies on models of dynamics, perception and traffic</li>
          <li>Act skills assumed fulfilled</li>
          <li>Needs the ODD information ahead, within the horizon</li></ul></div>
        <div class="card ok col" style="flex:1.15 1 0"><h3>Perspectives</h3><ol class="nums">
          <li><b>Generalizable</b> · new skills, shared skills, new behaviors, same planner</li>
          <li>Act skills · braking, steering, power</li>
          <li>Monitor a maneuver during its execution</li>
          <li>Learn where the vehicle is capable ${R("kuhn2021introspective", "rabiee2023introspective")}</li>
          <li>Richer traffic prediction, naturalistic data ${R("krajewski2018highd")}</li>
          <li>Learn the policy under capability constraints ${R("alshiekh2018shielding", "krasowski2020safe")}</li></ol></div>
        </div>` },

    { id: "publications", sec: "concl", kicker: "Publications", time: 15,
      title: "Publications",
      notes: "The publications of this work.",
      html: `<div class="col grow" style="justify-content:center;gap:26px">
        ${[["Journal", "Context-Aware and Reliable Long-Term Decision-Making for Safe Intelligent Vehicles: A Survey", "IEEE Transactions on Intelligent Vehicles, 10(12), pp. 5288–5307, 2025", "State of the art"],
           ["Conference", "ODD-Based Long-Term Decision-Making for Intelligent Vehicles", "IEEE Intelligent Vehicles Symposium (IV), pp. 1215–1221, Cluj-Napoca, Romania, 2025", "C2"],
           ["Conference", "Assessing the Decisional Capability for an ODD-Compliant Automatic Lane Change System via Sense-Think-Act Paradigm", "12th IFAC Symposium on Intelligent Autonomous Vehicles (IAV), IFAC-PapersOnLine 59(3), pp. 162–167, Phoenix, USA, 2025", "C1"]]
          .map(([k, t, v, c]) => `<div class="card row" style="align-items:center;gap:28px"><span class="pill ${k === "Journal" ? "" : "line"}" style="min-width:150px;justify-content:center">${k}</span>
            <div class="grow"><div style="font-weight:700;color:var(--navy);font-size:26px;line-height:1.3">${t}</div><div class="small mute">R. Cardenas, L. Adouane, C. Zinoune, M.-A. Benloucif · ${v}</div></div><span class="pill gray">${c}</span></div>`).join("")}
        </div>` },

    { id: "thanks", type: "thanks", sec: "concl", dark: true, title: "Thank you", time: 0,
      notes: "Thank you. I am ready for your questions.",
      html: `<video class="bg" muted playsinline preload="none" data-src="${V}fog.mp4" data-start="81" aria-hidden="true"></video><div class="stand"><div class="big">Thank you</div><div class="rule"></div><div class="sub">Questions and discussion</div>
        <div class="links"><a data-go="contrib">Contributions</a><a data-go="evidence">Evidence</a><a data-go="bindex">Appendix</a></div></div>` },
  ];

  // ================================================================ appendix
  const backups = [
    { id: "bindex", type: "bindex", sec: "backup", title: "Appendix", kicker: "For the questions" },

    { id: "b-assumptions", sec: "backup", kicker: "Appendix", title: "Working assumptions",
      html: `<div class="card grow"><ul class="list" style="font-size:27px;gap:18px">
          <li>The ODD and its requirements are specified in advance. Only the decisions adapt</li>
          <li>A predefined set of maneuvers, whose availability is assessed in each situation</li>
          <li>Ego, traffic and context come from upstream perception, localization, maps and fusion</li>
          <li>Capabilities that are not assessed, Act skills included, are assumed fulfilled</li>
          <li>Prediction models exist over a finite horizon; future operability is conditional on them</li>
          <li>Tactical decisions only, trajectory and control are downstream</li></ul></div>` },

    { id: "b-cost", sec: "backup", kicker: "Appendix", title: "Computational cost of one planning cycle",
      html: `<div class="g4">
          <div class="card stat"><span class="v">366</span><span class="l">states in the median ODD-MDP tree, four steps (p95 437, max 535)</span></div>
          <div class="card stat"><span class="v">25 ms</span><span class="l">median build and solve of the ODD-MDP (p95 38.8 ms, max 107 ms)</span></div>
          <div class="card stat"><span class="v">≈ 220–242 ms</span><span class="l">median ODD-POMDP cycle, 16 particles, at most 400 simulations</span></div>
          <div class="card stat"><span class="v">0.3 s</span><span class="l">time budget of the ODD-POMDP cycle</span></div></div>
        <div class="takeaway">Both planners run within the replanning period of 200 to 300 ms.</div>` },

    { id: "b-mrm", cite: ["sae2021taxonomy", "iso2020iso4804"], sec: "backup", kicker: "Appendix", title: "Three notions of MRM, and how they relate",
      html: `<div class="g2 grow">
          <div class="card ok"><h3>Ensured MRM</h3><div class="eq">MRM ∈ ${Aens()}</div><p>Its skills are fulfilled in <i class="m">s</i>, so <i class="m">s</i> is a safe state.</p></div>
          <div class="card accent"><h3>Reachable MRM</h3><div class="eq">𝟙<sub>MRM</sub>(<i>s</i>) = 1</div><p>An MRM is reachable from <i class="m">s</i>. Used by the fallback term after the time threshold.</p></div>
          <div class="card bad"><h3>Required MRM</h3><div class="eq">${Uens()} = ∅</div><p>No maneuver is ensured, a fallback is required ${R("sae2021taxonomy", "iso2020iso4804")}.</p></div>
          <div class="card amber"><h3>Fail-operational</h3><div class="eq">∀<i>k</i> ∈ {0, …, <i>H</i>}, <i>s<sub>k</sub></i> ∈ <i>S</i><sub>safe</sub></div><p>Pursued jointly by the filter and the reward, not imposed as a hard constraint.</p></div>
        </div>` },

    { id: "b-fallback", sec: "backup", kicker: "Appendix", title: "Fallback term, its time threshold and the horizon",
      html: `<div class="card eqbox"><div class="eq"><i>R</i><sub>time</sub>(<i>s</i>) = −[<i>t</i><sub>pred</sub>(<i>s</i>) − <i>T</i><sub>thr</sub>]<sup>+</sup> (1 − 𝟙<sub>MRM</sub>(<i>s</i>))</div></div>
        <div class="g4">
          <div class="card stat"><span class="v" style="font-size:40px">Threshold</span><span class="l">future time from which an MRM must remain reachable</span></div>
          <div class="card stat"><span class="v" style="font-size:40px">15 s · 10 s</span><span class="l">horizon, then threshold, in an example</span></div>
          <div class="card stat"><span class="v" style="font-size:40px">14–20 s</span><span class="l">horizon of four maneuvers in the validation</span></div>
          <div class="card stat"><span class="v" style="font-size:40px">20 s</span><span class="l">time budget to reach a minimal risk condition, Level 3</span></div></div>
        <div class="card grow"><ul class="list">
          <li>Before the threshold the term is zero, so the MRM may be briefly out of reach</li>
          <li>After it, every second without a reachable MRM is penalized, with the largest weight after collisions</li>
          <li>Safe states are pursued through the filter and this reward</li></ul></div>` },

    { id: "b-transition", sec: "backup", kicker: "Appendix", title: "One predicted successor per action",
      html: `<div class="row grow"><div class="col grow">
          <div class="card eqbox"><div class="eq"><i>ŝ</i>′ = <i>f</i>(<i>s</i>, <i>a</i>)</div><div class="eq"><i>P</i>(<i>s</i>′|<i>s</i>, <i>a</i>) = 1 for the predicted successor</div></div>
          <div class="card grow"><ul class="list">
            <li>Surrounding vehicles keep their lane and acceleration</li>
            <li>Ego vehicle follows its maneuver, ACC behind a leader</li>
            <li>Operational domain read from the electronic horizon</li>
            <li>Uncertainty on states, intentions and forecasts is handled by the ${go("pomdp-sources", "ODD-POMDP")}</li></ul></div></div>
        <div class="card col grow">${fig("state_frame.jpg", "State frame")}</div></div>` },

    { id: "b-vi", cite: ["bellman1957dynamic"], sec: "backup", kicker: "Appendix", title: "Value iteration on the tree of ensured states",
      html: `<div class="row grow"><div class="card grow"><ul class="list">
          <li>The tree of ensured states is built first, up to four steps</li>
          <li>The reward is evaluated on the successor state</li>
          <li>On a finite tree, value iteration converges to the backward induction from the leaves ${R("bellman1957dynamic")}</li>
          <li>The policy is the best ensured action at the root, and only that action is executed</li></ul></div>
        <div class="card col grow">${fig("tree.png", "Tree of ensured states")}</div></div>` },

    { id: "b-explain", sec: "backup", kicker: "Appendix", title: "Explaining a decision against keep lane, term by term",
      notes: "Because the planner is model-based, a decision can be explained. The reward is a weighted sum of named terms and the tree is explicit, so every value splits term by term. The reference is the nominal policy, keep the lane and the set speed, rolled out in the same model over the same horizon: the explanation answers the question a person asks, why this rather than carrying on. Short term, the first action against keep lane. Long term, the whole plan against the nominal plan. The term that gains most is the main reason; the terms that lose are the trade-off. Two levels: if keep lane is no longer ensured, the explanation is the capability, and the MCE names the skill lost and the context; if it is still ensured, the explanation is the choice, given by the terms. The bars are schematic, not measured.",
      html: `<div class="row grow xpl">
        <div class="col" style="flex:1 1 0">
          <div class="card tight"><h4>Why it can be explained</h4><ul class="list small">
            <li><b>Explicit model</b>, the tree of ensured states is built at every cycle</li>
            <li><b>Named reward terms</b>, every value splits term by term</li></ul>
            <div class="eq"><i>Q</i>(<i>s</i><sub>0</sub>, <i>a</i>) = Σ<sub><i>k</i></sub> <i>W<sub>k</sub></i> <i>Q<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>), &nbsp; <i>Q<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>) = Σ<sub><i>t</i>=0</sub><sup><i>H</i></sup> <i>γ<sup>t</sup></i> <i>R<sub>k</sub></i>(<i>s<sub>t</sub></i>, <i>a<sub>t</sub></i>)</div></div>
          <div class="card tight"><h4>Reference, the nominal policy</h4>
            <div class="eq"><i>π</i><sub>nom</sub>(<i>s</i>) = (KL, <i>θ</i> = 0), &nbsp; <i>Q<sub>k</sub></i><sup>nom</sup>(<i>s</i><sub>0</sub>) = Σ<sub><i>t</i></sub> <i>γ<sup>t</sup></i> <i>R<sub>k</sub></i>(<i>s<sub>t</sub></i><sup>nom</sup>, <i>a</i><sub>nom</sub>)</div>
            <ul class="list small">
            <li>Keep the lane and the set speed, if nothing calls for a change</li>
            <li>The question a person asks, <b>why this rather than carrying on?</b></li>
            <li>Same model, same horizon, same terms</li></ul></div>
          <div class="card tight grow"><h4>Two levels</h4><ul class="list small">
            <li><span class="pill ok">Capability</span> Keep lane no longer ensured, the MCE names the skill lost and its cause (${go("skills", "C1")})</li>
            <li><span class="pill">Choice</span> Keep lane still ensured, the terms say what the plan gains and pays (${go("reward", "C2")})</li></ul></div>
        </div>
        <div class="col" style="flex:1.08 1 0">
          <div class="card tight"><h4>Short term and long term</h4>
            <div class="eqrow"><div class="eq"><i>δ<sub>k</sub></i> = <i>W<sub>k</sub></i> [ <i>R<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>*) − <i>R<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i><sub>nom</sub>) ]</div><span><b>short term</b>, the first action</span></div>
            <div class="eqrow"><div class="eq"><i>Δ<sub>k</sub></i> = <i>W<sub>k</sub></i> [ <i>Q<sub>k</sub></i>(<i>s</i><sub>0</sub>, <i>a</i>*) − <i>Q<sub>k</sub></i><sup>nom</sup>(<i>s</i><sub>0</sub>) ]</div><span><b>long term</b>, the whole plan</span></div>
            <div class="eqrow"><div class="eq"><i>k</i>* = argmax<sub><i>k</i></sub> <i>Δ<sub>k</sub></i> &nbsp;·&nbsp; { <i>k</i> : <i>Δ<sub>k</sub></i> &lt; 0 }</div><span>the <b>main reason</b> and the <b>trade-off</b></span></div>
            <p class="xs mute" style="margin:4px 0 0">Σ<sub><i class="m">k</i></sub> <i class="m">Δ<sub>k</sub></i> = <i class="m">Q</i>(<i class="m">s</i><sub>0</sub>, <i class="m">a</i>*) − <i class="m">Q</i><sup>nom</sup>(<i class="m">s</i><sub>0</sub>) ≥ 0 whenever keep lane stays ensured, since the nominal plan is one branch of the tree</p></div>
          <div class="card tight grow"><h4>Reading of scenario 1, with traffic (${go("fog-b", "fog")}) · schematic</h4>
            <div class="xbars">
              <span class="lb main">Fallback <i class="m">R</i><sub>time</sub></span><span class="ng"></span><span class="ps"><i style="width:92%"></i></span>
              <span class="lb">Operability <i class="m">R</i><sub>op</sub></span><span class="ng"></span><span class="ps"><i style="width:38%"></i></span>
              <span class="lb">Risk <i class="m">R</i><sub>risk</sub></span><span class="ng"></span><span class="ps"><i style="width:6%"></i></span>
              <span class="lb">Lane change cost</span><span class="ng"><i style="width:16%"></i></span><span class="ps"></span>
              <span class="lb">Progress <i class="m">R</i><sub>speed</sub></span><span class="ng"><i style="width:44%"></i></span><span class="ps"></span>
              <span></span><span class="ax">pays</span><span class="ax r">gains</span></div>
            <div class="xsay">“I return to the right lane before the fog <b>because the hard shoulder must stay reachable</b> there. It costs speed behind the trucks, and one lane change.”</div>
            <p class="xs mute" style="margin:0">Bars <i class="m">Δ<sub>k</sub></i> drawn to illustrate the reading, not measured values</p></div>
        </div></div>` },

    { id: "b-reward", sec: "backup", kicker: "Appendix", title: "Reward terms in detail",
      html: `<table class="tbl"><tr><th style="width:260px">Term</th><th>Definition</th></tr>
          <tr><td><b>Collision</b></td><td>−1 if a collision occurs during the predicted execution or at the resulting state</td></tr>
          <tr><td><b>Risk</b></td><td>worst vehicle of the ego lane, mixing time to collision (1 to 10 s) and time headway (0.5 to 2 s)</td></tr>
          <tr><td><b>Legal</b></td><td>relative excess over the speed limit</td></tr>
          <tr><td><b>Speed</b></td><td>ego speed over the maximum speed considered, in [0, 1]</td></tr>
          <tr><td><b>Route</b></td><td>lane index, growing as the distance to the next itinerary event decreases</td></tr>
          <tr class="hl"><td><b>Operability</b></td><td>share of the actions lost, weighted by the margin of each ensured action</td></tr>
          <tr class="hl"><td><b>Fallback</b></td><td>time beyond the threshold without a reachable MRM</td></tr>
          <tr><td><b>Minor terms</b></td><td>lane change cost, and a penalty for overtaking on the right</td></tr></table>
        <p class="small mute">Weights, from collision down to fallback, operability, risk, legal and speed</p>` },

    { id: "b-pomcp", cite: ["auer2002finite", "silver_monte-carlo_2010"], sec: "backup", kicker: "Appendix", title: "ODD-constrained POMCP in practice",
      html: `<div class="g4">
          <div class="card stat"><span class="v">16</span><span class="l">particles in the noisy perception batch</span></div>
          <div class="card stat"><span class="v">32</span><span class="l">hypotheses on the fog in the forecast batch</span></div>
          <div class="card stat"><span class="v">≤ 400</span><span class="l">simulations per planning cycle</span></div>
          <div class="card stat"><span class="v"><i class="m">τ</i> = 0.9</span><span class="l">confidence threshold in all experiments</span></div></div>
        <div class="card grow"><ul class="list">
          <li>UCB1 ${R("auer2002finite")} selection, expansion and random rollout restricted to the ensured actions of the node</li>
          <li>Final action, the best ensured action at the root ${R("silver_monte-carlo_2010")}</li>
          <li>Belief rebuilt at every cycle from the world model, no second filtering</li>
          <li>Intentions estimated by a Gaussian naive Bayes classifier on position and speed</li></ul></div>` },

    { id: "b-margin", sec: "backup", kicker: "Appendix", title: "Three strategic margins in configuration A",
      html: `<div class="row grow"><div class="card col" style="flex:0.8 1 0">${fig("exploration_plane.png", "Explored states for three margins")}</div>
        <div class="card grow"><ul class="list">
          <li>Entry speed in the fog 94.4, 78.7 and 70.1 km/h for <i class="m">m</i> = 1, 1.2 and 1.5</li>
          <li>First deceleration 455 to 478 m before the fog for all three values</li>
          <li>With <i class="m">m</i> = 1.5 the preferred speed, ≈ 56 km/h, is not reached. The margin is a preference, not a second boundary</li>
          <li>At 620 m only <i class="m">m</i> = 1.5 already plans a deceleration. At 460 m, Keep Lane would leave the ensured region for <i class="m">m</i> = 1 and 1.2</li></ul>
          <p class="small mute" style="margin-top:16px">Explored states in the plane of speed and perception range, at four moments and for three margins.</p></div></div>` },

    { id: "b-rss", cite: ["shwartz2017RSS", "hasuo2022rss"], sec: "backup", kicker: "Appendix", title: "Sense skill parameters for the lane change",
      html: `<div class="row grow"><div class="card col grow">${fig("ranges.png", "Required perception ranges")}<p class="small mute">RSS ${R("shwartz2017RSS", "hasuo2022rss")} worst case about 300 m at 130 km/h. About 56 m with both vehicles at 100 km/h.</p></div>
        <table class="tbl" style="flex:0.7 1 0;align-self:flex-start"><tr><th>Parameter</th><th class="c">Value</th></tr>
          <tr><td>Response time, front zones</td><td class="c">0.5 s</td></tr><tr><td>Response time, rear zone</td><td class="c">1 s</td></tr>
          <tr><td>Maximum acceleration</td><td class="c">2 m/s²</td></tr><tr><td>Maximum braking</td><td class="c">7.5 m/s²</td></tr>
          <tr><td>Minimum braking</td><td class="c">2 m/s²</td></tr><tr><td>Time headway</td><td class="c">2 s</td></tr>
          <tr><td>Ratio R</td><td class="c">0.8</td></tr><tr><td>Traffic speed</td><td class="c">110 km/h ± 10 %</td></tr></table></div>` },

    { id: "b-outcomes", sec: "backup", kicker: "Appendix", title: "Outcome classes in configuration B",
      html: `<div class="card tight grow">${fig("outcomes.png", "Outcome classes in configuration B")}</div>
        <div class="card"><div class="g3 small"><span>(a) right lane, operable</span><span>(b) right lane but too fast, MRM</span><span>(c) return blocked by traffic</span><span>(d) return planned too late</span><span>(e) return never planned</span></div>
          <p class="small mute" style="margin-top:10px">Median last return 67 m before the fog with <i class="m">m</i> = 1, 93 m with <i class="m">m</i> = 1.2. One run with <i class="m">m</i> = 1.2 excluded, a truck reported with a wrong distance by the simulator.</p></div>` },

    { id: "b-exit", sec: "backup", kicker: "Appendix", title: "Highway exit, preparation and compliance",
      html: `<div class="row grow"><div class="card col tight" style="flex:0.6 1 0"><h4>Preparation</h4>${fig("exit_preparation.png", "Preparation of the exit")}</div>
          <div class="card col tight grow"><h4>Overtaking</h4>${fig("exit_overtakings.png", "Overtakings per run")}</div></div>
        <div class="card col tight grow"><h4>Rule compliance</h4>${fig("exit_compliance.png", "Overtaking on the right and time headway")}</div>` },

    { id: "b-learning", cite: ["hoel2019combiningdeep", "alshiekh2018shielding"], sec: "backup", kicker: "Appendix", title: "Why model-based, and not learned end to end",
      html: `<div class="row grow">
          <div class="card grow"><h3>Learning-based decision-making ${R("hoel2019combiningdeep")}</h3><ul class="list">
            <li>Scales well and handles unseen situations</li>
            <li>Remains a black box, with no safety guarantee for critical decisions</li>
            <li>Depends on data quality, needs many training episodes, and suffers from the sim-to-real gap</li>
            <li>Its horizon covers the surrounding traffic, not the capabilities of the vehicle itself</li></ul></div>
          <div class="card navy grow"><h3>In ODD-aptive</h3><ul class="list">
            <li>Each skill is a requirement on the operational domain, so decisions are traceable</li>
            <li>Each decision can be explained against keep lane, term by term (${go("b-explain", "appendix")})</li>
            <li>The filter excludes non-ensured maneuvers by construction ${R("alshiekh2018shielding")}</li>
            <li>Learning fits where skills rely on trained components, to learn where the vehicle is capable</li></ul></div></div>` },

    { id: "b-conf", sec: "backup", kicker: "Appendix", title: "Statistical confidence of the main proportions",
      html: `<table class="tbl" style="font-size:20px"><tr><th>Experiment</th><th>Outcome</th><th>Planner</th><th class="c">Observed</th><th class="c">95 % interval</th></tr>
          <tr><td rowspan="2"><b>Fog, configuration A</b></td><td rowspan="2">Runs without MRM</td><td>Reference</td><td class="c">0 / 100</td><td class="c">0 – 4 %</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c">100 / 100</td><td class="c">96 – 100 %</td></tr>
          <tr class="sep"><td rowspan="3"><b>Fog, configuration B</b></td><td rowspan="3">Right lane at the fog</td><td>Reference</td><td class="c">76 / 100</td><td class="c">66 – 84 %</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c">90 / 100</td><td class="c">82 – 95 %</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.2</td><td class="c">92 / 99</td><td class="c">86 – 97 %</td></tr>
          <tr class="sep"><td><b>Highway exit</b></td><td>Exits taken</td><td>ODD-aptive</td><td class="c">100 / 100</td><td class="c">96 – 100 %</td></tr>
          <tr class="sep"><td rowspan="2"><b>Noisy perception</b></td><td rowspan="2">Right lane and operable</td><td>ODD-MDP</td><td class="c">85 / 100</td><td class="c">76 – 91 %</td></tr>
          <tr class="hl"><td>ODD-POMDP</td><td class="c">94 / 100</td><td class="c">87 – 98 %</td></tr>
          <tr class="sep"><td rowspan="2"><b>Forecast errors</b></td><td rowspan="2">Fog passed</td><td>ODD-MDP</td><td class="c">10 / 20</td><td class="c">27 – 73 %</td></tr>
          <tr class="hl"><td>ODD-POMDP</td><td class="c">19 / 20</td><td class="c">75 – 100 %</td></tr></table>
        <p class="small mute" style="margin:0">Exact Clopper–Pearson intervals. Both planners run on the same seeds, so a paired test would be sharper.</p>` },

    { id: "b-takeover", cite: ["kuehn2017takeover", "sae2021taxonomy"], sec: "backup", kicker: "Appendix", title: "Driver takeover and automation levels",
      html: `<div class="card grow"><ul class="list">
          <li><b>Level 2</b>, fewer unplanned disengagements when the context shifts</li>
          <li><b>Level 3</b>, a timely request to intervene, 12 to 15 s ahead ${R("kuehn2017takeover")}</li>
          <li><b>Above Level 3</b>, the system reaches a minimal risk condition by itself ${R("sae2021taxonomy")}</li>
          <li>In ODD-aptive, the fallback is a guarantee held in reserve rather than the default behavior. Depending on the level, it is an MRM or a timely takeover request</li>
          <li>Scenario 1 uses a time budget of 20 s to reach a minimal risk condition, consistent with Level 3</li></ul></div>` },

    { id: "b-notation", sec: "backup", kicker: "Appendix", title: "Notation used in the presentation",
      html: `<table class="tbl"><tr><th>Symbol</th><th>Meaning</th><th>Symbol</th><th>Meaning</th></tr>
          <tr><td class="eq" style="font-size:24px">OD, <i>X</i><sub>ODD</sub></td><td>operational domain, ODD space</td><td class="eq" style="font-size:24px"><i>H</i></td><td>planning horizon (steps)</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>U</i>, ${Uens()}</td><td>maneuvers, ensured maneuvers</td><td class="eq" style="font-size:24px"><i>τ</i></td><td>confidence threshold</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>A</i>, ${Aens()}</td><td>actions, ensured actions</td><td class="eq" style="font-size:24px"><i>b<sub>t</sub></i></td><td>belief (particles)</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>f<sub>k</sub></i></td><td>skill <i class="m">k</i> fulfilled (0 or 1)</td><td class="eq" style="font-size:24px"><i>m<sub>k</sub></i></td><td>strategic margin</td></tr>
          <tr><td class="eq" style="font-size:24px">𝒦(<i>u</i>)</td><td>skills required by <i class="m">u</i></td><td class="eq" style="font-size:24px"><i>ρ</i></td><td>traffic density</td></tr>
          <tr><td class="eq" style="font-size:24px"><i>R</i>, <i>W</i></td><td>reward terms and weights</td><td class="eq" style="font-size:24px"><i>T</i><sub>thr</sub></td><td>fallback threshold</td></tr></table>` },

    { id: "b-vil", sec: "backup", kicker: "Appendix", title: "Vehicle-in-the-loop, plans and execution",
      html: `<div class="row grow"><div class="card col" style="flex:1.4 1 0"><h4>Four-maneuver plan at each update</h4>${fig("vil_planned_actions.png", "Planned actions")}</div>
          <div class="card col grow"><h4>Execution</h4>${fig("vil_speed.png", "Speed and lateral acceleration")}</div></div>
        <div class="card"><ul class="list small">
          <li>Both left lane changes appear in step 2 a few seconds before they become step 1</li>
          <li>Intermediate returns appear in step 2 around 50, 61 and 66 s, but never reach step 1</li>
          <li>Speed almost constant at ≈ 60 km/h</li></ul></div>` },

    // ---------------------------------------------------------------- moved from the main part (45 min), for the questions
    { id: "responsibility", cite: ["ref_claim_GM", "ref_claim_toyota", "ref_claim_Nissan", "sae2021taxonomy", "Farah2021Awareness", "kuehn2017takeover"], sec: "backup", kicker: "Appendix", time: 60,
      title: "Level by level, the frontier lies between Level 2 and Level 3",
      notes: "Automated driving advances, but level by level. Fully self-driving fleets were announced for 2019 and 2020, by General Motors, Toyota and Nissan. They did not arrive: driving proved harder than assumed. The decisive frontier is between Level 2 and Level 3. Up to Level 2, the driver supervises, and must know the limits of the system, which drivers often do not. From Level 3, the system performs the whole driving task within its operational design domain: it must monitor its own limits and request a takeover in time. From Level 4, nobody takes over: the system must reach a minimal risk condition by itself. So, to cross this frontier, the vehicle itself must know what it can do.",
      html: `<div class="row grow">
          <div class="card col" style="flex:1.5 1 0">${fig("sae_levels.png", "Automation levels and examples of ODD")}<p class="xs mute" style="margin:0">SAE J3016 ${R("sae2021taxonomy")} · fleets announced for 2019 – 2020 ${R("ref_claim_GM", "ref_claim_toyota", "ref_claim_Nissan")}</p></div>
          <div class="col grow" style="justify-content:center;gap:26px">
            <div class="card tight"><h3 style="margin:0">Level 2 · the driver watches ${R("Farah2021Awareness")}</h3></div>
            <div class="card tight accent"><h3 style="margin:0">Level 3 · the system drives ${R("kuehn2017takeover")}</h3></div>
            <div class="card tight ok"><h3 style="margin:0">Level 4 · nobody takes over</h3></div>
          </div></div>` },

    { id: "failop", cite: ["avizienis2004taxonomy", "iso2018iso26262", "fail2022Stolte"], sec: "backup", kicker: "Appendix", time: 60, steps: 2,
      title: "Fail-safe stops, fail-operational drives on with fewer capabilities",
      notes: "First, what fail-operational means, on a simple example: on a highway at 130 km/h, the primary LiDAR loses range, so the perception horizon shrinks. (1) A fail-safe system reaches a minimal risk condition: it stops on the hard shoulder, and the mission is aborted. (2) A fail-operational system updates its capabilities and replans: it continues at a reduced speed, without the lane change that is no longer ensured, while a minimal risk maneuver remains reachable.",
      html: `<div class="card row" style="gap:30px;align-items:center;padding:18px 28px">
          <img src="${F}failop_a.png" alt="The LiDAR range is reduced; the nominal range is dashed" style="width:640px;border-radius:10px">
          <h3 style="margin:0">The LiDAR loses range<br>What now?</h3></div>
        <div class="g2 grow">
          <div class="card col" data-step="1" style="gap:12px"><h3 style="margin:0">Fail-safe ${R("avizienis2004taxonomy", "iso2018iso26262")}</h3><img src="${F}failop_e.png" alt="Fail-safe: the vehicle stops on the hard shoulder" style="width:100%;border-radius:10px">
            <p style="margin:0;font-size:30px"><b>Stops</b></p></div>
          <div class="card col ok" data-step="2" style="gap:12px"><h3 style="margin:0">Fail-operational ${R("fail2022Stolte")}</h3><img src="${F}failop_f.png" alt="Fail-operational: the vehicle continues at a reduced speed, the lane change is no longer ensured" style="width:100%;border-radius:10px">
            <p style="margin:0;font-size:30px"><b>Drives on</b>, with fewer capabilities</p></div>
        </div>` },

    { id: "awareness", cite: ["armand2014ontology", "salvi2022fuzzy", "woerter2021enhanced", "schlatow2017selfawareness"], sec: "backup", kicker: "Appendix", time: 70, steps: 2,
      title: "What must the vehicle know about its context, and about itself?",
      notes: "What the vehicle must know, in two kinds of awareness. Context awareness: the knowledge associated with the context, semantic, such as road users and crossings, or aggregated, such as a school zone, its speed limit and the time of day; and the risk associated with the context, here a risk map around a vehicle. (1) Self awareness: the impact of actions on oneself, for instance what the vehicle can still see after a lane change, and the dependencies of the system, for instance the capability graph of an ACC, whose behaviors rest on lower-level capabilities. (2) The ODD links both: the capabilities of the system, and a structured representation of the context. Its limits: the perceived context is uncertain, so margins are needed, and the boundaries are discontinuous, so they must be anticipated.",
      html: `<div class="awr">
          <div class="card col aw ctx"><h3>The context</h3>
            <div class="awg">
              <figure><img src="${F}aw_semantic.png" alt="Road with vehicles and a pedestrian crossing"><figcaption>${R("armand2014ontology")}</figcaption></figure>
              <figure><img src="${F}aw_aggregated.png" alt="School zone at 30, and the time of day"><figcaption>${R("salvi2022fuzzy")}</figcaption></figure>
              <figure class="w2"><img src="${F}aw_risk.png" alt="Risk map around a vehicle"><figcaption>${R("woerter2021enhanced")}</figcaption></figure>
            </div></div>
          <div class="card col aw self" data-step="1"><h3>Itself ${R("schlatow2017selfawareness")}</h3>
            <div class="awg">
              <figure class="w2"><img src="${F}aw_vision.png" alt="What the vehicle can see before and after a lane change"></figure>
              <figure class="w2"><img src="${F}aw_graph.png" alt="Capability graph of an ACC"></figure>
            </div></div>
        </div>
        <div class="card navy awodd" data-step="2"><b>The ODD links both</b></div>` },

    { id: "assumptions", sec: "backup", c: ["C1"], kicker: "Appendix", time: 50,
      title: "Which maneuvers can the vehicle ensure, now and after its decisions?",
      notes: "What we want to analyse. The ODD does not change, but the context and the driving situation do, so the maneuvers the vehicle can ensure change along the journey. And a maneuver ensured now may lead to a state where the next ones are no longer ensured. So the capability must be assessed now, and in the situations the decisions lead to. For that, we first need three things: the maneuvers, and the conditions each one requires, which is the ODD brought down to the maneuvers; the skills that let us assess a maneuver in a given state; and the predicted states, on which the same assessment is repeated. The working assumptions are in the appendix.",
      backups: ["b-assumptions"],
      html: `<div class="card tight" style="font-size:28px;padding:20px 32px">The context changes, and so do the <b>ensured maneuvers</b><br>Ensured now can lead to a state where <b>the next ones are not</b></div>
        <div class="c1need">
          <div class="cpch"><span>To analyse it, we first need</span></div>
          <div class="c1steps">
            <a class="card c1s" data-go="maneuvers"><span class="n">1</span><b>The maneuvers, and what each one requires</b><span class="t">The ODD brought down to the maneuvers</span></a>
            <span class="c1a">→</span>
            <a class="card c1s" data-go="skills"><span class="n">2</span><b>Skills to assess a maneuver in a state</b><span class="t">Sense, Think, Act</span></a>
            <span class="c1a">→</span>
            <a class="card c1s" data-go="v-mce"><span class="n">3</span><b>The same assessment in the predicted states</b><span class="t">Now, and after each decision</span></a>
          </div></div>` },

    { id: "sense-zones", cite: ["bussemaker2014SensingRF", "CARDENAS2025162"], sec: "backup", c: ["C1"], kicker: "Appendix", time: 70, steps: 3,
      title: "Before engaging, does the vehicle see all it needs?",
      notes: "Take the Sense skills. The question they answer: before engaging in a maneuver, does the vehicle see all it needs? Each maneuver has key zones whose content the vehicle must know first. Entering a roundabout: the part of the ring from which the cars arrive. Crossing an intersection: the crossing road, in both directions. Overtaking a stopped bus: the crossing in front of the bus, where a pedestrian may step out. Changing lane: three zones around the vehicle. A key zone counts only if it is inside what the vehicle perceives, and its perception envelope is reduced in two ways: fog shrinks it, as in the roundabout and the lane change; obstacles occlude it, as the buildings at the intersection, until the vehicle reaches the stop line, or the bus: the vehicle starts to overtake, its sight lines to the crossing stop on the bus, so it holds, sees a pedestrian step out, and creeps until it sees the whole crossing. A key zone that is not perceived: the maneuver is not ensured. Let us now take one of them in detail: the lane change.",
      html: `<div class="card tight" style="font-size:26px;padding:16px 30px">Each maneuver has <b>key zones</b> ${R("bussemaker2014SensingRF")}, seen only inside the <b>perception envelope</b> ${R("CARDENAS2025162")}, shrunk by fog or occluded</div>
        <div class="sloops seq">${[["sense_roundabout", "Entering a roundabout", "the ring upstream of the entry", "Fog"],
          ["sense_intersection", "Crossing an intersection", "the crossing road, both ways", "Occlusion"],
          ["sense_bus", "Overtaking a stopped bus", "the crossing in front of the bus", "Occlusion"],
          ["sense_lane", "Changing lane", "zones A, B and C", "Fog"]].map(([v, t, z, c], k) =>
          `<div class="card sl"><video class="bg" muted playsinline preload="auto" data-src="${A}${v}.mp4?v=4" data-on="${k}" data-rate="1.8" data-still="1.5" aria-label="${t}, key zones, then ${c.toLowerCase()}"></video>
            <div class="cap"><b><span class="k">${k + 1}</span>${t}</b><span>${z}</span><em class="${c === "Fog" ? "fog" : "occ"}">${c}</em></div></div>`).join("")}</div>
        <div class="card navy tight" style="font-size:25px;padding:16px 30px">A key zone not perceived, and the maneuver is <b>not ensured</b></div>` },

    { id: "other-skills", cite: ["CARDENAS2025162"], sec: "backup", c: ["C1"], kicker: "Appendix", time: 45,
      title: "Lane markings, prediction and interaction complete the skill graph",
      notes: "Three other skills. The density skill is the one used for the congestion before the exit. Degradation is per maneuver: Keep Lane can remain ensured with a reduced performance range.",
      html: `<div class="g3">
          <div class="card col"><span class="pill" style="align-self:flex-start">Sense · lane markings</span> ${R("CARDENAS2025162")}<div class="eq" style="margin:18px 0;font-size:29px"><i>f</i><sub>lane</sub>(<i>S</i>) = 1 ⇔ <i>d</i><sub>PE</sub><sup>lane</sup>(<i>S</i>) ≥ <i>D</i><sub>min</sub>(<i>S</i>)</div><p class="small">Markings seen over the stopping distance</p></div>
          <div class="card col"><span class="pill" style="align-self:flex-start">Think · prediction</span><div class="eq" style="margin:18px 0;font-size:29px"><i>f</i><sub>pred</sub>(<i>S</i>) = 1 ⇔ every perceived vehicle is regular</div><p class="small">No emergency vehicles, no two-wheelers</p></div>
          <div class="card col"><span class="pill" style="align-self:flex-start">Think · interaction</span><div class="eq" style="margin:18px 0;font-size:29px"><i>f</i><sub>inter</sub>(<i>S</i>) = 1 ⇔ <i>ρ</i>(<i>S</i>) ≤ <i>ρ</i><sub>max</sub></div><p class="small">Fluid traffic only, density announced ahead</p></div>
        </div>
        <div class="card ok"><p><b>Keep Lane</b> needs no rear zone, so it stays ensured, slower, when the lane change is lost</p></div>` },

    { id: "margin", cite: ["salvi2022fuzzy", "hullermeier2021aleatoric"], sec: "backup", c: ["C1"], kicker: "Appendix", time: 60, steps: 3,
      title: "Ensured, but how close to the boundary?",
      notes: "A plane of states. Each point is a state of the vehicle: its speed, and the perception range it has. Above the blue curve the forward sensing skill is fulfilled; the curve is the boundary. Ensured is binary, but the distance between the point and the boundary tells how close the maneuver is to being lost. We measure it with the ratio of the available range to the required one, 1 on the boundary. Here S, at 110 km/h with 120 m, is far from it. (1) In fog, with 50 m, at 90 km/h, the point is still above the boundary: ensured, but on the edge, a ratio of about 1.02. A little less visibility and it is lost. (2) The strategic margin m, chosen by the designer, defines a preferred region, here m = 1.5, the dashed curve. The normalized margin w goes from 0 on the boundary to 1 in this region, and an action is as close as its most constrained skill. So the planner prefers to slow down, to about 56 km/h. (3) This enters the operability term of the reward. No maneuver is removed: the margin is a preference, not a second boundary.",
      backups: ["b-margin"],
      html: `<div class="row grow">
        <div class="card col mgcard" style="flex:1.3 1 0"><h4>Forward sensing skill, a state and its boundary</h4>
          <svg class="mgplot" viewBox="0 0 1000 740" role="img" aria-label="State point and capability boundary in the plane of velocity and perception range">
            <defs><marker id="mg-ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#063669"/></marker></defs>
            <path class="reg" d="M96.0,533.4 L98.2,532.8 L100.4,532.2 L102.6,531.6 L104.8,531.0 L107.0,530.4 L109.3,529.8 L111.5,529.1 L113.7,528.5 L115.9,527.9 L118.1,527.3 L120.3,526.7 L122.5,526.1 L124.7,525.5 L126.9,524.9 L129.2,524.3 L131.4,523.6 L133.6,523.0 L135.8,522.4 L138.0,521.8 L140.2,521.2 L142.4,520.6 L144.6,520.0 L146.8,519.4 L149.0,518.8 L151.2,518.1 L153.5,517.5 L155.7,516.9 L157.9,516.3 L160.1,515.7 L162.3,515.1 L164.5,514.5 L166.7,513.9 L168.9,513.3 L171.1,512.6 L173.3,512.0 L175.6,511.4 L177.8,510.8 L180.0,510.2 L182.2,509.6 L184.4,509.0 L186.6,508.4 L188.8,507.8 L191.0,507.1 L193.2,506.5 L195.4,505.9 L197.7,505.3 L199.9,504.7 L202.1,504.1 L204.3,503.5 L206.5,502.9 L208.7,502.3 L210.9,501.6 L213.1,501.0 L215.3,500.4 L217.6,499.8 L219.8,499.2 L222.0,498.6 L224.2,498.0 L226.4,497.4 L228.6,496.8 L230.8,496.1 L233.0,495.5 L235.2,494.9 L237.4,494.3 L239.7,493.7 L241.9,493.1 L244.1,492.5 L246.3,491.9 L248.5,491.3 L250.7,490.6 L252.9,490.0 L255.1,489.4 L257.3,488.8 L259.5,488.2 L261.8,487.6 L264.0,487.0 L266.2,486.4 L268.4,485.8 L270.6,485.1 L272.8,484.5 L275.0,483.9 L277.2,483.3 L279.4,482.7 L281.6,482.1 L283.9,481.5 L286.1,480.9 L288.3,480.3 L290.5,479.6 L292.7,479.0 L294.9,478.4 L297.1,477.8 L299.3,477.2 L301.5,476.6 L303.7,476.0 L305.9,475.4 L308.2,474.8 L310.4,474.1 L312.6,473.5 L314.8,472.9 L317.0,472.3 L319.2,471.7 L321.4,471.1 L323.6,470.5 L325.8,469.9 L328.1,469.3 L330.3,468.6 L332.5,468.0 L334.7,467.4 L336.9,466.8 L339.1,466.2 L341.3,465.6 L343.5,465.0 L345.7,464.4 L347.9,463.8 L350.1,463.1 L352.4,462.5 L354.6,461.9 L356.8,461.3 L359.0,460.7 L361.2,460.1 L363.4,459.5 L365.6,458.9 L367.8,458.3 L370.0,457.6 L372.2,457.0 L374.5,456.4 L376.7,455.8 L378.9,455.2 L381.1,454.6 L383.3,454.0 L385.5,453.4 L387.7,452.8 L389.9,452.1 L392.1,451.5 L394.4,450.9 L396.6,450.3 L398.8,449.7 L401.0,449.1 L403.2,448.5 L405.4,447.9 L407.6,447.3 L409.8,446.6 L412.0,446.0 L414.2,445.4 L416.4,444.8 L418.7,444.2 L420.9,443.6 L423.1,443.0 L425.3,442.4 L427.5,441.8 L429.7,441.1 L431.9,440.5 L434.1,439.9 L436.3,439.3 L438.6,438.7 L440.8,438.1 L443.0,437.5 L445.2,436.9 L447.4,436.3 L449.6,435.6 L451.8,435.0 L454.0,434.4 L456.2,433.8 L458.4,433.2 L460.6,432.6 L462.9,432.0 L465.1,431.4 L467.3,430.8 L469.5,430.1 L471.7,429.5 L473.9,428.9 L476.1,428.3 L478.3,427.7 L480.5,427.1 L482.8,426.5 L485.0,425.9 L487.2,425.3 L489.4,424.9 L491.6,424.9 L493.8,424.9 L496.0,424.9 L498.2,424.9 L500.4,424.9 L502.6,424.9 L504.9,424.9 L507.1,424.9 L509.3,424.9 L511.5,424.9 L513.7,424.9 L515.9,424.9 L518.1,424.9 L520.3,424.9 L522.5,424.9 L524.7,424.9 L527.0,424.9 L529.2,424.9 L531.4,424.9 L533.6,424.9 L535.8,424.9 L538.0,424.9 L540.2,424.9 L542.4,424.9 L544.6,424.9 L546.8,424.9 L549.0,424.9 L551.3,424.9 L553.5,424.9 L555.7,424.9 L557.9,424.9 L560.1,424.9 L562.3,424.9 L564.5,424.9 L566.7,424.9 L568.9,424.4 L571.1,423.8 L573.4,423.3 L575.6,422.7 L577.8,422.1 L580.0,421.5 L582.2,420.9 L584.4,420.3 L586.6,419.7 L588.8,419.1 L591.0,418.4 L593.2,417.8 L595.5,417.1 L597.7,416.5 L599.9,415.8 L602.1,415.1 L604.3,414.4 L606.5,413.7 L608.7,412.9 L610.9,412.2 L613.1,411.5 L615.4,410.7 L617.6,409.9 L619.8,409.2 L622.0,408.4 L624.2,407.6 L626.4,406.8 L628.6,405.9 L630.8,405.1 L633.0,404.3 L635.2,403.4 L637.5,402.5 L639.7,401.7 L641.9,400.8 L644.1,399.9 L646.3,399.0 L648.5,398.1 L650.7,397.1 L652.9,396.2 L655.1,395.3 L657.3,394.3 L659.5,393.3 L661.8,392.4 L664.0,391.4 L666.2,390.4 L668.4,389.4 L670.6,388.3 L672.8,387.3 L675.0,386.3 L677.2,385.2 L679.4,384.1 L681.6,383.1 L683.9,382.0 L686.1,380.9 L688.3,379.8 L690.5,378.7 L692.7,377.5 L694.9,376.4 L697.1,375.2 L699.3,374.1 L701.5,372.9 L703.8,371.7 L706.0,370.5 L708.2,369.3 L710.4,368.1 L712.6,366.9 L714.8,365.7 L717.0,364.4 L719.2,363.2 L721.4,361.9 L723.6,360.6 L725.9,359.3 L728.1,358.0 L730.3,356.7 L732.5,355.4 L734.7,354.1 L736.9,352.8 L739.1,351.4 L741.3,350.0 L743.5,348.7 L745.7,347.3 L748.0,345.9 L750.2,344.5 L752.4,343.1 L754.6,341.7 L756.8,340.2 L759.0,338.8 L761.2,337.3 L763.4,335.8 L765.6,334.4 L767.8,332.9 L770.0,331.4 L772.3,329.9 L774.5,328.3 L776.7,326.8 L778.9,325.3 L781.1,323.7 L783.3,322.2 L785.5,320.6 L787.7,319.0 L789.9,317.4 L792.1,315.8 L794.4,314.2 L796.6,312.6 L798.8,310.9 L801.0,309.3 L803.2,307.6 L805.4,306.0 L807.6,304.3 L809.8,302.6 L812.0,300.9 L814.2,299.2 L816.5,297.4 L818.7,295.7 L820.9,294.0 L823.1,292.2 L825.3,290.5 L827.5,288.7 L829.7,286.9 L831.9,285.1 L834.1,283.3 L836.4,281.5 L838.6,279.6 L840.8,277.8 L843.0,276.0 L845.2,274.1 L847.4,272.2 L849.6,270.3 L851.8,268.5 L854.0,266.6 L856.2,264.6 L858.5,262.7 L860.7,260.8 L862.9,258.8 L865.1,256.9 L867.3,254.9 L869.5,252.9 L871.7,251.0 L873.9,249.0 L876.1,246.9 L878.3,244.9 L880.5,242.9 L882.8,240.9 L885.0,238.8 L887.2,236.7 L889.4,234.7 L891.6,232.6 L893.8,230.5 L896.0,228.4 L898.2,226.3 L900.4,224.2 L902.6,222.0 L904.9,219.9 L907.1,217.7 L909.3,215.5 L911.5,213.4 L913.7,211.2 L915.9,209.0 L918.1,206.8 L920.3,204.5 L922.5,202.3 L924.8,200.1 L927.0,197.8 L929.2,195.6 L931.4,193.3 L933.6,191.0 L935.8,188.7 L938.0,186.4 L940.2,184.1 L942.4,181.8 L944.6,179.4 L946.9,177.1 L949.1,174.7 L951.3,172.3 L953.5,170.0 L955.7,167.6 L957.9,165.2 L960.1,162.8 L962.3,160.3 L964.5,157.9 L966.7,155.5 L969.0,153.0 L971.2,150.5 L973.4,148.1 L975.6,145.6 L977.8,143.1 L980.0,140.6 L980.0,24.0 L96.0,24.0 Z"/>
            <g data-step="2"><path class="preg" d="M96.0,480.1 L98.2,479.2 L100.4,478.3 L102.6,477.4 L104.8,476.5 L107.0,475.6 L109.3,474.6 L111.5,473.7 L113.7,472.8 L115.9,471.9 L118.1,471.0 L120.3,470.0 L122.5,469.1 L124.7,468.2 L126.9,467.3 L129.2,466.4 L131.4,465.5 L133.6,464.6 L135.8,463.6 L138.0,462.7 L140.2,461.8 L142.4,460.9 L144.6,460.0 L146.8,459.0 L149.0,458.1 L151.2,457.2 L153.5,456.3 L155.7,455.4 L157.9,454.5 L160.1,453.6 L162.3,452.6 L164.5,451.7 L166.7,450.8 L168.9,449.9 L171.1,449.0 L173.3,448.1 L175.6,447.1 L177.8,446.2 L180.0,445.3 L182.2,444.4 L184.4,443.5 L186.6,442.5 L188.8,441.6 L191.0,440.7 L193.2,439.8 L195.4,438.9 L197.7,438.0 L199.9,437.1 L202.1,436.1 L204.3,435.2 L206.5,434.3 L208.7,433.4 L210.9,432.5 L213.1,431.5 L215.3,430.6 L217.6,429.7 L219.8,428.8 L222.0,427.9 L224.2,427.0 L226.4,426.1 L228.6,425.1 L230.8,424.2 L233.0,423.3 L235.2,422.4 L237.4,421.5 L239.7,420.5 L241.9,419.6 L244.1,418.7 L246.3,417.8 L248.5,416.9 L250.7,416.0 L252.9,415.1 L255.1,414.1 L257.3,413.2 L259.5,412.3 L261.8,411.4 L264.0,410.5 L266.2,409.6 L268.4,408.6 L270.6,407.7 L272.8,406.8 L275.0,405.9 L277.2,405.0 L279.4,404.0 L281.6,403.1 L283.9,402.2 L286.1,401.3 L288.3,400.4 L290.5,399.5 L292.7,398.6 L294.9,397.6 L297.1,396.7 L299.3,395.8 L301.5,394.9 L303.7,394.0 L305.9,393.0 L308.2,392.1 L310.4,391.2 L312.6,390.3 L314.8,389.4 L317.0,388.5 L319.2,387.6 L321.4,386.6 L323.6,385.7 L325.8,384.8 L328.1,383.9 L330.3,383.0 L332.5,382.1 L334.7,381.1 L336.9,380.2 L339.1,379.3 L341.3,378.4 L343.5,377.5 L345.7,376.6 L347.9,375.6 L350.1,374.7 L352.4,373.8 L354.6,372.9 L356.8,372.0 L359.0,371.1 L361.2,370.1 L363.4,369.2 L365.6,368.3 L367.8,367.4 L370.0,366.5 L372.2,365.6 L374.5,364.6 L376.7,363.7 L378.9,362.8 L381.1,361.9 L383.3,361.0 L385.5,360.1 L387.7,359.1 L389.9,358.2 L392.1,357.3 L394.4,356.4 L396.6,355.5 L398.8,354.6 L401.0,353.6 L403.2,352.7 L405.4,351.8 L407.6,350.9 L409.8,350.0 L412.0,349.1 L414.2,348.1 L416.4,347.2 L418.7,346.3 L420.9,345.4 L423.1,344.5 L425.3,343.6 L427.5,342.6 L429.7,341.7 L431.9,340.8 L434.1,339.9 L436.3,339.0 L438.6,338.1 L440.8,337.1 L443.0,336.2 L445.2,335.3 L447.4,334.4 L449.6,333.5 L451.8,332.6 L454.0,331.6 L456.2,330.7 L458.4,329.8 L460.6,328.9 L462.9,328.0 L465.1,327.1 L467.3,326.1 L469.5,325.2 L471.7,324.3 L473.9,323.4 L476.1,322.5 L478.3,321.5 L480.5,320.6 L482.8,319.7 L485.0,318.8 L487.2,317.9 L489.4,317.3 L491.6,317.3 L493.8,317.3 L496.0,317.3 L498.2,317.3 L500.4,317.3 L502.6,317.3 L504.9,317.3 L507.1,317.3 L509.3,317.3 L511.5,317.3 L513.7,317.3 L515.9,317.3 L518.1,317.3 L520.3,317.3 L522.5,317.3 L524.7,317.3 L527.0,317.3 L529.2,317.3 L531.4,317.3 L533.6,317.3 L535.8,317.3 L538.0,317.3 L540.2,317.3 L542.4,317.3 L544.6,317.3 L546.8,317.3 L549.0,317.3 L551.3,317.3 L553.5,317.3 L555.7,317.3 L557.9,317.3 L560.1,317.3 L562.3,317.3 L564.5,317.3 L566.7,317.3 L568.9,316.5 L571.1,315.7 L573.4,314.9 L575.6,314.0 L577.8,313.2 L580.0,312.3 L582.2,311.4 L584.4,310.5 L586.6,309.6 L588.8,308.6 L591.0,307.7 L593.2,306.7 L595.5,305.7 L597.7,304.7 L599.9,303.7 L602.1,302.6 L604.3,301.6 L606.5,300.5 L608.7,299.4 L610.9,298.3 L613.1,297.2 L615.4,296.0 L617.6,294.9 L619.8,293.7 L622.0,292.5 L624.2,291.3 L626.4,290.1 L628.6,288.9 L630.8,287.7 L633.0,286.4 L635.2,285.1 L637.5,283.8 L639.7,282.5 L641.9,281.2 L644.1,279.8 L646.3,278.5 L648.5,277.1 L650.7,275.7 L652.9,274.3 L655.1,272.9 L657.3,271.5 L659.5,270.0 L661.8,268.5 L664.0,267.1 L666.2,265.6 L668.4,264.0 L670.6,262.5 L672.8,261.0 L675.0,259.4 L677.2,257.8 L679.4,256.2 L681.6,254.6 L683.9,253.0 L686.1,251.3 L688.3,249.7 L690.5,248.0 L692.7,246.3 L694.9,244.6 L697.1,242.9 L699.3,241.1 L701.5,239.4 L703.8,237.6 L706.0,235.8 L708.2,234.0 L710.4,232.2 L712.6,230.4 L714.8,228.5 L717.0,226.6 L719.2,224.8 L721.4,222.9 L723.6,220.9 L725.9,219.0 L728.1,217.1 L730.3,215.1 L732.5,213.1 L734.7,211.1 L736.9,209.1 L739.1,207.1 L741.3,205.1 L743.5,203.0 L745.7,200.9 L748.0,198.8 L750.2,196.7 L752.4,194.6 L754.6,192.5 L756.8,190.3 L759.0,188.2 L761.2,186.0 L763.4,183.8 L765.6,181.6 L767.8,179.3 L770.0,177.1 L772.3,174.8 L774.5,172.5 L776.7,170.2 L778.9,167.9 L781.1,165.6 L783.3,163.2 L785.5,160.9 L787.7,158.5 L789.9,156.1 L792.1,153.7 L794.4,151.3 L796.6,148.8 L798.8,146.4 L801.0,143.9 L803.2,141.4 L805.4,138.9 L807.6,136.4 L809.8,133.9 L812.0,131.3 L814.2,128.8 L816.5,126.2 L818.7,123.6 L820.9,121.0 L823.1,118.3 L825.3,115.7 L827.5,113.0 L829.7,110.3 L831.9,107.6 L834.1,104.9 L836.4,102.2 L838.6,99.5 L840.8,96.7 L843.0,93.9 L845.2,91.1 L847.4,88.3 L849.6,85.5 L851.8,82.7 L854.0,79.8 L856.2,77.0 L858.5,74.1 L860.7,71.2 L862.9,68.3 L865.1,65.3 L867.3,62.4 L869.5,59.4 L871.7,56.4 L873.9,53.4 L876.1,50.4 L878.3,47.4 L880.5,44.3 L882.8,41.3 L885.0,38.2 L887.2,35.1 L889.4,32.0 L891.6,28.9 L893.8,25.7 L895.0,24.0 L895.0,24.0 L96.0,24.0 Z"/></g>
            <g class="grid"><line x1="96.0" y1="24" x2="96.0" y2="640"/><line x1="272.8" y1="24" x2="272.8" y2="640"/><line x1="449.6" y1="24" x2="449.6" y2="640"/><line x1="626.4" y1="24" x2="626.4" y2="640"/><line x1="803.2" y1="24" x2="803.2" y2="640"/><line x1="980.0" y1="24" x2="980.0" y2="640"/><line x1="96" y1="640.0" x2="980" y2="640.0"/><line x1="96" y1="530.0" x2="980" y2="530.0"/><line x1="96" y1="420.0" x2="980" y2="420.0"/><line x1="96" y1="310.0" x2="980" y2="310.0"/><line x1="96" y1="200.0" x2="980" y2="200.0"/><line x1="96" y1="90.0" x2="980" y2="90.0"/></g>
            <g data-step="2"><path class="pref" d="M96.0,480.1 L98.2,479.2 L100.4,478.3 L102.6,477.4 L104.8,476.5 L107.0,475.6 L109.3,474.6 L111.5,473.7 L113.7,472.8 L115.9,471.9 L118.1,471.0 L120.3,470.0 L122.5,469.1 L124.7,468.2 L126.9,467.3 L129.2,466.4 L131.4,465.5 L133.6,464.6 L135.8,463.6 L138.0,462.7 L140.2,461.8 L142.4,460.9 L144.6,460.0 L146.8,459.0 L149.0,458.1 L151.2,457.2 L153.5,456.3 L155.7,455.4 L157.9,454.5 L160.1,453.6 L162.3,452.6 L164.5,451.7 L166.7,450.8 L168.9,449.9 L171.1,449.0 L173.3,448.1 L175.6,447.1 L177.8,446.2 L180.0,445.3 L182.2,444.4 L184.4,443.5 L186.6,442.5 L188.8,441.6 L191.0,440.7 L193.2,439.8 L195.4,438.9 L197.7,438.0 L199.9,437.1 L202.1,436.1 L204.3,435.2 L206.5,434.3 L208.7,433.4 L210.9,432.5 L213.1,431.5 L215.3,430.6 L217.6,429.7 L219.8,428.8 L222.0,427.9 L224.2,427.0 L226.4,426.1 L228.6,425.1 L230.8,424.2 L233.0,423.3 L235.2,422.4 L237.4,421.5 L239.7,420.5 L241.9,419.6 L244.1,418.7 L246.3,417.8 L248.5,416.9 L250.7,416.0 L252.9,415.1 L255.1,414.1 L257.3,413.2 L259.5,412.3 L261.8,411.4 L264.0,410.5 L266.2,409.6 L268.4,408.6 L270.6,407.7 L272.8,406.8 L275.0,405.9 L277.2,405.0 L279.4,404.0 L281.6,403.1 L283.9,402.2 L286.1,401.3 L288.3,400.4 L290.5,399.5 L292.7,398.6 L294.9,397.6 L297.1,396.7 L299.3,395.8 L301.5,394.9 L303.7,394.0 L305.9,393.0 L308.2,392.1 L310.4,391.2 L312.6,390.3 L314.8,389.4 L317.0,388.5 L319.2,387.6 L321.4,386.6 L323.6,385.7 L325.8,384.8 L328.1,383.9 L330.3,383.0 L332.5,382.1 L334.7,381.1 L336.9,380.2 L339.1,379.3 L341.3,378.4 L343.5,377.5 L345.7,376.6 L347.9,375.6 L350.1,374.7 L352.4,373.8 L354.6,372.9 L356.8,372.0 L359.0,371.1 L361.2,370.1 L363.4,369.2 L365.6,368.3 L367.8,367.4 L370.0,366.5 L372.2,365.6 L374.5,364.6 L376.7,363.7 L378.9,362.8 L381.1,361.9 L383.3,361.0 L385.5,360.1 L387.7,359.1 L389.9,358.2 L392.1,357.3 L394.4,356.4 L396.6,355.5 L398.8,354.6 L401.0,353.6 L403.2,352.7 L405.4,351.8 L407.6,350.9 L409.8,350.0 L412.0,349.1 L414.2,348.1 L416.4,347.2 L418.7,346.3 L420.9,345.4 L423.1,344.5 L425.3,343.6 L427.5,342.6 L429.7,341.7 L431.9,340.8 L434.1,339.9 L436.3,339.0 L438.6,338.1 L440.8,337.1 L443.0,336.2 L445.2,335.3 L447.4,334.4 L449.6,333.5 L451.8,332.6 L454.0,331.6 L456.2,330.7 L458.4,329.8 L460.6,328.9 L462.9,328.0 L465.1,327.1 L467.3,326.1 L469.5,325.2 L471.7,324.3 L473.9,323.4 L476.1,322.5 L478.3,321.5 L480.5,320.6 L482.8,319.7 L485.0,318.8 L487.2,317.9 L489.4,317.3 L491.6,317.3 L493.8,317.3 L496.0,317.3 L498.2,317.3 L500.4,317.3 L502.6,317.3 L504.9,317.3 L507.1,317.3 L509.3,317.3 L511.5,317.3 L513.7,317.3 L515.9,317.3 L518.1,317.3 L520.3,317.3 L522.5,317.3 L524.7,317.3 L527.0,317.3 L529.2,317.3 L531.4,317.3 L533.6,317.3 L535.8,317.3 L538.0,317.3 L540.2,317.3 L542.4,317.3 L544.6,317.3 L546.8,317.3 L549.0,317.3 L551.3,317.3 L553.5,317.3 L555.7,317.3 L557.9,317.3 L560.1,317.3 L562.3,317.3 L564.5,317.3 L566.7,317.3 L568.9,316.5 L571.1,315.7 L573.4,314.9 L575.6,314.0 L577.8,313.2 L580.0,312.3 L582.2,311.4 L584.4,310.5 L586.6,309.6 L588.8,308.6 L591.0,307.7 L593.2,306.7 L595.5,305.7 L597.7,304.7 L599.9,303.7 L602.1,302.6 L604.3,301.6 L606.5,300.5 L608.7,299.4 L610.9,298.3 L613.1,297.2 L615.4,296.0 L617.6,294.9 L619.8,293.7 L622.0,292.5 L624.2,291.3 L626.4,290.1 L628.6,288.9 L630.8,287.7 L633.0,286.4 L635.2,285.1 L637.5,283.8 L639.7,282.5 L641.9,281.2 L644.1,279.8 L646.3,278.5 L648.5,277.1 L650.7,275.7 L652.9,274.3 L655.1,272.9 L657.3,271.5 L659.5,270.0 L661.8,268.5 L664.0,267.1 L666.2,265.6 L668.4,264.0 L670.6,262.5 L672.8,261.0 L675.0,259.4 L677.2,257.8 L679.4,256.2 L681.6,254.6 L683.9,253.0 L686.1,251.3 L688.3,249.7 L690.5,248.0 L692.7,246.3 L694.9,244.6 L697.1,242.9 L699.3,241.1 L701.5,239.4 L703.8,237.6 L706.0,235.8 L708.2,234.0 L710.4,232.2 L712.6,230.4 L714.8,228.5 L717.0,226.6 L719.2,224.8 L721.4,222.9 L723.6,220.9 L725.9,219.0 L728.1,217.1 L730.3,215.1 L732.5,213.1 L734.7,211.1 L736.9,209.1 L739.1,207.1 L741.3,205.1 L743.5,203.0 L745.7,200.9 L748.0,198.8 L750.2,196.7 L752.4,194.6 L754.6,192.5 L756.8,190.3 L759.0,188.2 L761.2,186.0 L763.4,183.8 L765.6,181.6 L767.8,179.3 L770.0,177.1 L772.3,174.8 L774.5,172.5 L776.7,170.2 L778.9,167.9 L781.1,165.6 L783.3,163.2 L785.5,160.9 L787.7,158.5 L789.9,156.1 L792.1,153.7 L794.4,151.3 L796.6,148.8 L798.8,146.4 L801.0,143.9 L803.2,141.4 L805.4,138.9 L807.6,136.4 L809.8,133.9 L812.0,131.3 L814.2,128.8 L816.5,126.2 L818.7,123.6 L820.9,121.0 L823.1,118.3 L825.3,115.7 L827.5,113.0 L829.7,110.3 L831.9,107.6 L834.1,104.9 L836.4,102.2 L838.6,99.5 L840.8,96.7 L843.0,93.9 L845.2,91.1 L847.4,88.3 L849.6,85.5 L851.8,82.7 L854.0,79.8 L856.2,77.0 L858.5,74.1 L860.7,71.2 L862.9,68.3 L865.1,65.3 L867.3,62.4 L869.5,59.4 L871.7,56.4 L873.9,53.4 L876.1,50.4 L878.3,47.4 L880.5,44.3 L882.8,41.3 L885.0,38.2 L887.2,35.1 L889.4,32.0 L891.6,28.9 L893.8,25.7 L895.0,24.0"/>
              <text class="lab pf" x="122.5" y="76.8">preferred region, <tspan class="mi">m</tspan> = 1.5</text></g>
            <path class="bnd" d="M96.0,533.4 L98.2,532.8 L100.4,532.2 L102.6,531.6 L104.8,531.0 L107.0,530.4 L109.3,529.8 L111.5,529.1 L113.7,528.5 L115.9,527.9 L118.1,527.3 L120.3,526.7 L122.5,526.1 L124.7,525.5 L126.9,524.9 L129.2,524.3 L131.4,523.6 L133.6,523.0 L135.8,522.4 L138.0,521.8 L140.2,521.2 L142.4,520.6 L144.6,520.0 L146.8,519.4 L149.0,518.8 L151.2,518.1 L153.5,517.5 L155.7,516.9 L157.9,516.3 L160.1,515.7 L162.3,515.1 L164.5,514.5 L166.7,513.9 L168.9,513.3 L171.1,512.6 L173.3,512.0 L175.6,511.4 L177.8,510.8 L180.0,510.2 L182.2,509.6 L184.4,509.0 L186.6,508.4 L188.8,507.8 L191.0,507.1 L193.2,506.5 L195.4,505.9 L197.7,505.3 L199.9,504.7 L202.1,504.1 L204.3,503.5 L206.5,502.9 L208.7,502.3 L210.9,501.6 L213.1,501.0 L215.3,500.4 L217.6,499.8 L219.8,499.2 L222.0,498.6 L224.2,498.0 L226.4,497.4 L228.6,496.8 L230.8,496.1 L233.0,495.5 L235.2,494.9 L237.4,494.3 L239.7,493.7 L241.9,493.1 L244.1,492.5 L246.3,491.9 L248.5,491.3 L250.7,490.6 L252.9,490.0 L255.1,489.4 L257.3,488.8 L259.5,488.2 L261.8,487.6 L264.0,487.0 L266.2,486.4 L268.4,485.8 L270.6,485.1 L272.8,484.5 L275.0,483.9 L277.2,483.3 L279.4,482.7 L281.6,482.1 L283.9,481.5 L286.1,480.9 L288.3,480.3 L290.5,479.6 L292.7,479.0 L294.9,478.4 L297.1,477.8 L299.3,477.2 L301.5,476.6 L303.7,476.0 L305.9,475.4 L308.2,474.8 L310.4,474.1 L312.6,473.5 L314.8,472.9 L317.0,472.3 L319.2,471.7 L321.4,471.1 L323.6,470.5 L325.8,469.9 L328.1,469.3 L330.3,468.6 L332.5,468.0 L334.7,467.4 L336.9,466.8 L339.1,466.2 L341.3,465.6 L343.5,465.0 L345.7,464.4 L347.9,463.8 L350.1,463.1 L352.4,462.5 L354.6,461.9 L356.8,461.3 L359.0,460.7 L361.2,460.1 L363.4,459.5 L365.6,458.9 L367.8,458.3 L370.0,457.6 L372.2,457.0 L374.5,456.4 L376.7,455.8 L378.9,455.2 L381.1,454.6 L383.3,454.0 L385.5,453.4 L387.7,452.8 L389.9,452.1 L392.1,451.5 L394.4,450.9 L396.6,450.3 L398.8,449.7 L401.0,449.1 L403.2,448.5 L405.4,447.9 L407.6,447.3 L409.8,446.6 L412.0,446.0 L414.2,445.4 L416.4,444.8 L418.7,444.2 L420.9,443.6 L423.1,443.0 L425.3,442.4 L427.5,441.8 L429.7,441.1 L431.9,440.5 L434.1,439.9 L436.3,439.3 L438.6,438.7 L440.8,438.1 L443.0,437.5 L445.2,436.9 L447.4,436.3 L449.6,435.6 L451.8,435.0 L454.0,434.4 L456.2,433.8 L458.4,433.2 L460.6,432.6 L462.9,432.0 L465.1,431.4 L467.3,430.8 L469.5,430.1 L471.7,429.5 L473.9,428.9 L476.1,428.3 L478.3,427.7 L480.5,427.1 L482.8,426.5 L485.0,425.9 L487.2,425.3 L489.4,424.9 L491.6,424.9 L493.8,424.9 L496.0,424.9 L498.2,424.9 L500.4,424.9 L502.6,424.9 L504.9,424.9 L507.1,424.9 L509.3,424.9 L511.5,424.9 L513.7,424.9 L515.9,424.9 L518.1,424.9 L520.3,424.9 L522.5,424.9 L524.7,424.9 L527.0,424.9 L529.2,424.9 L531.4,424.9 L533.6,424.9 L535.8,424.9 L538.0,424.9 L540.2,424.9 L542.4,424.9 L544.6,424.9 L546.8,424.9 L549.0,424.9 L551.3,424.9 L553.5,424.9 L555.7,424.9 L557.9,424.9 L560.1,424.9 L562.3,424.9 L564.5,424.9 L566.7,424.9 L568.9,424.4 L571.1,423.8 L573.4,423.3 L575.6,422.7 L577.8,422.1 L580.0,421.5 L582.2,420.9 L584.4,420.3 L586.6,419.7 L588.8,419.1 L591.0,418.4 L593.2,417.8 L595.5,417.1 L597.7,416.5 L599.9,415.8 L602.1,415.1 L604.3,414.4 L606.5,413.7 L608.7,412.9 L610.9,412.2 L613.1,411.5 L615.4,410.7 L617.6,409.9 L619.8,409.2 L622.0,408.4 L624.2,407.6 L626.4,406.8 L628.6,405.9 L630.8,405.1 L633.0,404.3 L635.2,403.4 L637.5,402.5 L639.7,401.7 L641.9,400.8 L644.1,399.9 L646.3,399.0 L648.5,398.1 L650.7,397.1 L652.9,396.2 L655.1,395.3 L657.3,394.3 L659.5,393.3 L661.8,392.4 L664.0,391.4 L666.2,390.4 L668.4,389.4 L670.6,388.3 L672.8,387.3 L675.0,386.3 L677.2,385.2 L679.4,384.1 L681.6,383.1 L683.9,382.0 L686.1,380.9 L688.3,379.8 L690.5,378.7 L692.7,377.5 L694.9,376.4 L697.1,375.2 L699.3,374.1 L701.5,372.9 L703.8,371.7 L706.0,370.5 L708.2,369.3 L710.4,368.1 L712.6,366.9 L714.8,365.7 L717.0,364.4 L719.2,363.2 L721.4,361.9 L723.6,360.6 L725.9,359.3 L728.1,358.0 L730.3,356.7 L732.5,355.4 L734.7,354.1 L736.9,352.8 L739.1,351.4 L741.3,350.0 L743.5,348.7 L745.7,347.3 L748.0,345.9 L750.2,344.5 L752.4,343.1 L754.6,341.7 L756.8,340.2 L759.0,338.8 L761.2,337.3 L763.4,335.8 L765.6,334.4 L767.8,332.9 L770.0,331.4 L772.3,329.9 L774.5,328.3 L776.7,326.8 L778.9,325.3 L781.1,323.7 L783.3,322.2 L785.5,320.6 L787.7,319.0 L789.9,317.4 L792.1,315.8 L794.4,314.2 L796.6,312.6 L798.8,310.9 L801.0,309.3 L803.2,307.6 L805.4,306.0 L807.6,304.3 L809.8,302.6 L812.0,300.9 L814.2,299.2 L816.5,297.4 L818.7,295.7 L820.9,294.0 L823.1,292.2 L825.3,290.5 L827.5,288.7 L829.7,286.9 L831.9,285.1 L834.1,283.3 L836.4,281.5 L838.6,279.6 L840.8,277.8 L843.0,276.0 L845.2,274.1 L847.4,272.2 L849.6,270.3 L851.8,268.5 L854.0,266.6 L856.2,264.6 L858.5,262.7 L860.7,260.8 L862.9,258.8 L865.1,256.9 L867.3,254.9 L869.5,252.9 L871.7,251.0 L873.9,249.0 L876.1,246.9 L878.3,244.9 L880.5,242.9 L882.8,240.9 L885.0,238.8 L887.2,236.7 L889.4,234.7 L891.6,232.6 L893.8,230.5 L896.0,228.4 L898.2,226.3 L900.4,224.2 L902.6,222.0 L904.9,219.9 L907.1,217.7 L909.3,215.5 L911.5,213.4 L913.7,211.2 L915.9,209.0 L918.1,206.8 L920.3,204.5 L922.5,202.3 L924.8,200.1 L927.0,197.8 L929.2,195.6 L931.4,193.3 L933.6,191.0 L935.8,188.7 L938.0,186.4 L940.2,184.1 L942.4,181.8 L944.6,179.4 L946.9,177.1 L949.1,174.7 L951.3,172.3 L953.5,170.0 L955.7,167.6 L957.9,165.2 L960.1,162.8 L962.3,160.3 L964.5,157.9 L966.7,155.5 L969.0,153.0 L971.2,150.5 L973.4,148.1 L975.6,145.6 L977.8,143.1 L980.0,140.6"/>
            <text class="lab bl" x="741.3" y="384.0">capability boundary</text>
            
            <text class="lab fu" x="962.3" y="76.8" text-anchor="end">skill fulfilled</text>
            <text class="lab nf" x="820.9" y="596.0" text-anchor="middle">not fulfilled</text>
            <g class="ax"><line x1="96" y1="640" x2="980" y2="640"/><line x1="96" y1="24" x2="96" y2="640"/></g>
            <g class="tk"><text x="96.0" y="670" text-anchor="middle">40</text><text x="272.8" y="670" text-anchor="middle">60</text><text x="449.6" y="670" text-anchor="middle">80</text><text x="626.4" y="670" text-anchor="middle">100</text><text x="803.2" y="670" text-anchor="middle">120</text><text x="980.0" y="670" text-anchor="middle">140</text><text x="84" y="648.0" text-anchor="end">0</text><text x="84" y="538.0" text-anchor="end">25</text><text x="84" y="428.0" text-anchor="end">50</text><text x="84" y="318.0" text-anchor="end">75</text><text x="84" y="208.0" text-anchor="end">100</text><text x="84" y="98.0" text-anchor="end">125</text></g>
            <text class="axl" x="538.0" y="732" text-anchor="middle">ego-vehicle velocity <tspan class="mi">v</tspan><tspan class="sb" dy="6">ego</tspan><tspan dy="-6"> [km/h]</tspan></text>
            <text class="axl" transform="translate(26,332.0) rotate(-90)" text-anchor="middle">available perception range <tspan class="mi">d</tspan><tspan class="sb" dy="6">PE</tspan><tspan dy="-6"> [m]</tspan></text>
            <line class="gap" x1="714.8" y1="128.0" x2="714.8" y2="363.7" marker-end="url(#mg-ar)"/>
            <text class="lab sm" x="730.8" y="234.8">far from the boundary</text>
            <text class="lab sm" x="730.8" y="264.8"><tspan class="mi">ρ</tspan> ≈ 1.9</text>
            <circle class="pt" cx="714.8" cy="112.0" r="13"/><text class="sl" x="692.8" y="94.0" text-anchor="end"><tspan class="mi">S</tspan></text>
            <g data-step="1">
              <line class="fog" x1="96" y1="420.0" x2="980" y2="420.0"/>
              <text class="lab fg" x="972" y="450.0" text-anchor="end">fog, 50 m</text>
              <path class="mv" d="M702.8,126.0 C654.8,252.0 628.0,300.0 548.0,404.0" marker-end="url(#mg-ar)"/>
              <circle class="pt edge" cx="538.0" cy="420.0" r="13"/>
              <text class="lab" x="530.0" y="486.0">90 km/h, on the edge, <tspan class="mi">ρ</tspan> ≈ 1.02</text>
              <line class="cross" x1="585.6" y1="406.0" x2="585.6" y2="434.0"/>
              <text class="lab sm bl" x="593.6" y="452.0">boundary at 95 km/h</text></g>
            <g data-step="2">
              <path class="mv" d="M520.0,394.0 L257.4,394.0" marker-end="url(#mg-ar)"/>
              <text class="lab pf" x="122.5" y="244.0">slow down to 56 km/h</text><text class="lab pf sm" x="122.5" y="274.0"><tspan class="mi">ρ</tspan> = <tspan class="mi">m</tspan> = 1.5, <tspan class="mi">w</tspan> = 1</text>
              <circle class="pt pr" cx="237.4" cy="420.0" r="13"/></g>
          </svg>
          <p class="xs mute" style="margin:0">Required range for zones B and C, traffic ahead at 110 km/h</p></div>
        <div class="col" style="flex:1 1 0;gap:18px">
          <div class="card tight col" style="gap:8px"><h4>How far from the boundary ${R("salvi2022fuzzy")}</h4>
            <div class="eq" style="font-size:30px;text-align:center"><i>ρ<sub>k</sub></i>(<i>s</i>) = <span class="fr"><span><i>g<sub>k</sub></i><sup>av</sup>(<i>s</i>)</span><span><i>g<sub>k</sub></i><sup>req</sup>(<i>s</i>)</span></span> &nbsp;=&nbsp; <span class="fr"><span><i>d</i><sub>PE</sub></span><span><i>d</i><sub>req</sub>(<i>v</i><sub>ego</sub>)</span></span></div>
            <p class="small" style="margin:0">Available over required, <b>1 on the boundary</b></p></div>
          <div class="card tight col" data-step="2" style="gap:8px"><h4>Strategic margin ${R("hullermeier2021aleatoric")}</h4>
            <div class="eq" style="font-size:30px;text-align:center"><i>w<sub>k</sub></i>(<i>s</i>) = min(1, <span class="fr"><span><i>ρ<sub>k</sub></i>(<i>s</i>) − 1</span><span><i>m<sub>k</sub></i> − 1</span></span>)</div>
            <p class="small" style="margin:0">0 on the boundary, 1 in the preferred region<br><i class="m">w<sub>a</sub></i> = min<sub><i class="m">k</i></sub> <i class="m">w<sub>k</sub></i>, the most constrained skill</p></div>
          <div class="card tight col grow" data-step="3" style="gap:8px"><h4>In the reward, not a second boundary</h4>
            <div class="eq" style="font-size:28px;text-align:center"><i>R</i><sub>op</sub>(<i>s</i>) = −( 1 − <sup>1</sup>⁄<sub>|<i>A</i>|</sub> Σ<sub><i>a</i> ∈ ${Aens()}</sub> <i>w<sub>a</sub></i>(<i>s</i>) )</div>
            <p class="small" style="margin:0">The planner slows down before the boundary<br>No maneuver is removed</p></div>
        </div></div>` },

    { id: "pomcp", cite: ["auer2002finite", "silver_monte-carlo_2010"], sec: "backup", c: ["C3"], kicker: "Appendix", time: 50,
      title: "The MCE filters selection, expansion and rollout",
      notes: "POMCP with the capability filter at the three stages where actions are chosen. The final action is the best ensured action at the root. The particles carry the intentions of the other drivers.",
      backups: ["b-pomcp", "b-cost"],
      html: `<div class="g4">
          ${[["Selection", "UCB1 among ensured actions " + R("auer2002finite"), 1], ["Expansion", "Only ensured actions", 1], ["Rollout", "Random among ensured actions", 1], ["Backpropagation", "Values and visit counts " + R("silver_monte-carlo_2010"), 0]]
            .map(([t, d, f], j) => `<div class="card col" style="gap:10px"><div class="row" style="align-items:center;gap:12px"><div class="num-badge" style="width:44px;height:44px;font-size:21px">${j + 1}</div><h3 style="margin:0">${t}</h3></div>
              <p class="small">${d}</p>${f ? '<span class="pill ok" style="align-self:flex-start;margin-top:auto">MCE filter</span>' : ""}</div>`).join("")}
        </div>
        <div class="row grow">
          <div class="card col grow" style="justify-content:center;gap:22px;padding:26px 60px">
            <div class="eqn"><span class="nm">Selection · UCB1<small>good actions, and rarely tried ones</small></span><div class="eq"><i>a</i> = argmax<sub><i>a</i> ∈ ${Aens("b<sub>h</sub>")}</sub> [ <i>Q</i>(<i>h</i>, <i>a</i>) + <i>c</i> √( ln <i>N</i>(<i>h</i>) / <i>N</i>(<i>h</i>, <i>a</i>) ) ]</div></div>
            <div class="eqn"><span class="nm">Return of a simulation<small>discounted sum of rewards</small></span><div class="eq"><i>G</i> = Σ<sub><i>k</i>=0</sub><sup><i>H</i></sup> <i>γ</i><sup><i>k</i></sup> <i>R</i>(<i>s<sub>k</sub></i>, <i>a<sub>k</sub></i>)</div></div>
            <div class="eqn"><span class="nm">Value update<small>running mean of the returns</small></span><div class="eq"><i>Q</i>(<i>h</i>, <i>a</i>) ← <i>Q</i>(<i>h</i>, <i>a</i>) + ( <i>G</i> − <i>Q</i>(<i>h</i>, <i>a</i>) ) / <i>N</i>(<i>h</i>, <i>a</i>)</div></div>
            <div class="eqn"><span class="nm">Decision<small>the best ensured action at the root</small></span><div class="eq"><i>a<sub>t</sub></i> = argmax<sub><i>a</i> ∈ ${Aens("b<sub>t</sub>")}</sub> <i>Q</i>(<i>h</i><sub>0</sub>, <i>a</i>)</div></div>
            <div class="lgd" style="margin-top:6px"><span class="s"><i>h</i>, <i>b<sub>h</sub></i></span><span>a node and its particles</span><span class="s"><i>Q</i>, <i>N</i></span><span>value and visit counts</span>
              <span class="s"><i>c</i></span><span>exploration weight</span><span class="s"><i>γ</i>, <i>H</i></span><span>discount and horizon</span></div></div>
        </div>` },

    { id: "v-fog", type: "video", sec: "backup", kicker: "Appendix", c: ["C2", "C4"], time: 135,
      title: "Scenario 1: reduced visibility",
      notes: "The hypotheses of the fog scenario, then the reference planner with a single decision step against ODD-aptive with four steps, on the same traffic.",
      video: { src: V + "fog.mp4", parts: [[12.0, "The electronic horizon announces the fog"], [18.5, "Fog reduces the perception envelope"], [29.0, "Keep Lane ensured, lane change not ensured"], [41.0, "The MRM requires the hard shoulder"], [48.5, "Keep the MRM reachable when the capabilities are degraded"], [61.5, "The simulations, and how to read the display"], [81.0, "One decision step against four, up to the fog"]] } },

    { id: "fog-b", sec: "backup", c: ["C2", "C4"], kicker: "Appendix", time: 60,
      title: "With traffic, more returns in time and more overtaking",
      notes: "Configuration B. ODD-aptive plans the return in every run. Its remaining failures are mostly returns blocked by a vehicle alongside in the last 300 m. And it overtakes more, so anticipation is not conservative. One run with m = 1.2 is excluded, a simulator artefact.",
      backups: ["b-outcomes", "b-conf"],
      html: `<div class="row grow">
        <div class="card col" style="flex:1.1 1 0"><h4>Lane occupied before the fog</h4>${fig("fog_lane_occupancy.png", "Lane occupancy before the fog")}</div>
        <div class="card grow"><h4>Setup</h4><ul class="list small">
          <li>Three lanes, slower trucks on the right</li>
          <li>No lane change ensured in the fog</li>
          <li>MRM on the hard shoulder, from the right lane</li>
          <li>100 seeds per planner</li></ul></div>
        </div>
        <table class="tbl"><tr><th>Planner</th><th class="c">Right lane at the fog</th><th class="c">Blocked by traffic</th><th class="c">Planned too late</th><th class="c">Never planned</th><th class="c">Runs with overtaking</th><th class="c">Mean speed</th></tr>
          <tr><td>Reference, one step</td><td class="c">76 / 100</td><td class="c">5</td><td class="c">10</td><td class="c">9</td><td class="c">45</td><td class="c">90.7 km/h</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1</td><td class="c"><b>90 / 100</b></td><td class="c">7</td><td class="c">3</td><td class="c"><b>0</b></td><td class="c"><b>82</b></td><td class="c">96.1 km/h</td></tr>
          <tr class="hl"><td>ODD-aptive, <i class="m">m</i> = 1.2</td><td class="c"><b>92 / 99</b></td><td class="c">6</td><td class="c">1</td><td class="c"><b>0</b></td><td class="c">76</td><td class="c">94.3 km/h</td></tr></table>` },

    { id: "congestion", sec: "backup", c: ["C2", "C4"], kicker: "Appendix", time: 50,
      title: "Announced congestion brings the return ≈ 400 m earlier",
      notes: "The planner only models the nearest vehicles, so it cannot see the congestion before reaching it. The announced density is the only way to know that the lane changes will become harder. We frame it as a capability limit.",
      html: `<div class="row">
        <div class="card grow small">Density rises over the last 1.5 km, announced ahead</div>
        <div class="card grow small">Lane change ensured only below a maximum density</div>
        <div class="card grow small">Same 20 seeds, with and without the announcement</div></div>
        <div class="card tight grow">${fig("congestion.png", "Returns with and without the announced density")}</div>
        <div class="g4">
          <div class="card tight stat"><span class="v" style="font-size:40px">471 → 876 m</span><span class="l">median final return, without then with</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px">94 → 218 m</span><span class="l">latest return before the exit</span></div>
          <div class="card tight stat"><span class="v ok" style="font-size:40px">20 / 20</span><span class="l">exits taken by both</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px">83.4 → 85.0</span><span class="l">km/h mean speed, no loss</span></div>
        </div>` },

    { id: "r-noisy", sec: "backup", c: ["C3", "C4"], kicker: "Appendix", time: 50,
      title: "Under noisy perception, the belief keeps a safe gap",
      notes: "With noise, the ODD-MDP is outside the right lane at the fog entry in 13 runs, the ODD-POMDP in 6. No collision in any run. The gain comes from evaluating each lane change over several hypotheses.",
      html: `<div class="row grow">
        <div class="card col" style="flex:1.25 1 0">${fig("noisy_frames.png", "Noisy perception frames, ODD-MDP and ODD-POMDP")}</div>
        <div class="col grow">
          <div class="card small">Car behind at 102 km/h, seen at 108<br><b>ODD-MDP</b> rejects the gap<br><b>ODD-POMDP</b> changes lane 430 m before the fog</div>
          <div class="card tight stat"><span class="v" style="font-size:42px">13 → 6</span><span class="l">runs outside the right lane at the fog, MDP then POMDP</span></div>
          <div class="card tight stat"><span class="v ok" style="font-size:42px">85 → 94</span><span class="l">runs in the right lane and operable</span></div>
          <div class="card tight stat"><span class="v" style="font-size:42px">236 → 367 m</span><span class="l">return starts earlier before the fog</span></div>
          <p class="xs mute" style="margin:0">Same 100 seeds for both planners</p>
        </div></div>` },

    { id: "r-forecast-tau", sec: "backup", c: ["C3", "C4"], kicker: "Appendix", time: 50,
      title: "The threshold τ turns a probability into a boundary",
      notes: "Top: share of hypotheses for which Keep Lane is ensured, in the plane of speed and forecast visibility. The threshold tau turns this probability into a boundary. Bottom: the higher tau, the earlier and smoother the slowdown.",
      html: `<div class="row grow">
        <div class="col" style="flex:1.2 1 0">
          <div class="card tight grow">${fig("capability_plane.png", "Share of hypotheses where Keep Lane is ensured")}</div>
          <div class="card tight grow">${fig("admissible_speed.png", "Admissible speed for several thresholds")}</div>
        </div>
        <div class="col grow">
          <div class="card small">32 fog hypotheses, corrected on board as the fog nears</div>
          <div class="card tight stat"><span class="v" style="font-size:42px">75 → 92 m</span><span class="l">visibility needed at 120 km/h, exact forecast then <i class="m">τ</i> = 0.9</span></div>
          <div class="card tight stat"><span class="v" style="font-size:42px">95 → 165 m</span><span class="l">slowdown starts earlier</span></div>
          <div class="card tight stat"><span class="v" style="font-size:42px"><i class="m">τ</i> = 0.9</span><span class="l">chosen, <i class="m">τ</i> = 1 too conservative</span></div>
        </div></div>` },

    { id: "r-forecast", sec: "backup", c: ["C3", "C4"], kicker: "Appendix", time: 50,
      title: "Despite forecast errors, the ODD-POMDP passes the fog in 19 of 20 runs",
      notes: "The fog starts up to 150 m before or after the announced point. When it is denser than announced, the ODD-MDP arrives too fast and loses Keep Lane. The ODD-POMDP slows down progressively and passes every dense case. The cost is one precautionary MRM in a lighter fog.",
      backups: ["b-conf"],
      html: `<div class="row grow">
        <div class="col grow">
          <table class="tbl"><tr><th>Real fog</th><th>Planner</th><th class="c">Passed</th><th class="c">MRM</th></tr>
            <tr><td rowspan="2"><b>All 20 seeds</b></td><td>ODD-MDP</td><td class="c">10</td><td class="c">10</td></tr>
            <tr class="hl"><td>ODD-POMDP</td><td class="c"><b>19</b></td><td class="c">1</td></tr>
            <tr class="sep"><td rowspan="2"><b>Denser (11)</b></td><td>ODD-MDP</td><td class="c">1</td><td class="c">10</td></tr>
            <tr class="hl"><td>ODD-POMDP</td><td class="c"><b>11</b></td><td class="c">0</td></tr>
            <tr class="sep"><td rowspan="2"><b>Lighter (9)</b></td><td>ODD-MDP</td><td class="c">9</td><td class="c">0</td></tr>
            <tr class="hl"><td>ODD-POMDP</td><td class="c">8</td><td class="c">1</td></tr></table>
          <div class="g2">
            <div class="card tight stat"><span class="v bad" style="font-size:40px">+27.5 km/h</span><span class="l">ODD-MDP, largest excess over the admissible speed</span></div>
            <div class="card tight stat"><span class="v ok" style="font-size:40px">0 runs</span><span class="l">ODD-POMDP above the admissible speed · no collision</span></div>
          </div>
        </div>
        <div class="card col" style="flex:0.95 1 0">${fig("forecast_run.png", "Seed 8: real fog after the announced point")}
          <p class="xs mute">Seed 8, fog later and denser than announced<br>ODD-POMDP enters at 73 km/h · ODD-MDP at 92 km/h, then MRM</p></div>
        </div>` },

    { id: "v-intentions", type: "video", sec: "backup", kicker: "Appendix", c: ["C3", "C4"], time: 95,
      title: "Uncertain tactical intentions",
      notes: "An intention cannot be measured: it is estimated from the kinematics. The particles hold the possible maneuvers, and each future is evaluated with its consequences. Two use cases: a cut-in, and a vehicle entering the highway.",
      video: { src: V + "intentions.mp4", parts: [[12.0, "An intention cannot be measured"], [19.75, "The tactical state of each vehicle"], [29.25, "The belief: a set of particles"], [38.75, "Each future is evaluated with its consequences"], [52.5, "The simulations, and how to read the display"], [69.75, "A cut-in, and a vehicle entering the highway"]] } },

    { id: "r-cutin", sec: "backup", c: ["C3", "C4"], kicker: "Appendix", time: 45,
      title: "The ODD-POMDP reacts to a cut-in before the car moves",
      notes: "Reaction time measured from the start of the lateral motion of the car. The ODD-POMDP evaluates separately the futures with and without the cut-in, which explains its earlier reaction. Illustrative run only.",
      html: `<p class="small" style="margin:0">Ego at 130 km/h, a car cuts in from behind a truck · same intention estimate for all, <i class="m">P</i> ≈ 0.35 – 0.39</p>
        <div class="card tight col" style="gap:8px"><h4>ODD-MDP with tactical risk</h4><div class="g3">${fig("cutin_mdp_a.png", "ODD-MDP, a", 210)}${fig("cutin_mdp_b.png", "ODD-MDP, b", 210)}${fig("cutin_mdp_c.png", "ODD-MDP, c", 210)}</div></div>
        <div class="card tight col" style="gap:8px"><h4>ODD-POMDP</h4><div class="g3">${fig("cutin_pomdp_a.png", "ODD-POMDP, a", 210)}${fig("cutin_pomdp_b.png", "ODD-POMDP, b", 210)}${fig("cutin_pomdp_c.png", "ODD-POMDP, c", 210)}</div></div>
        <div class="g3">
          <div class="card tight stat"><span class="v bad" style="font-size:40px">+2.4 s</span><span class="l">ODD-MDP without tactical risk, brakes to 102 km/h</span></div>
          <div class="card tight stat"><span class="v" style="font-size:40px;color:var(--deg)">+0.8 s</span><span class="l">ODD-MDP with tactical risk, brakes to 106 km/h</span></div>
          <div class="card tight stat"><span class="v ok" style="font-size:40px">−2.8 s</span><span class="l">ODD-POMDP, changes lane first, keeps 130 km/h</span></div>
        </div>` },
    { id: "v-rss", type: "video", sec: "backup", kicker: "Appendix", c: ["C1"], time: 40,
      title: "What distance to keep behind the front vehicle?",
      notes: "The safe distance of RSS: enough to stop in time, and enough for the ACC to settle in smoothly behind a vehicle that slows down. It builds the required perception range of the Sense skill.",
      video: { src: A + "rss.mp4", parts: [[0.0, "How much distance to stop in time?"], [16.91, "How much distance to settle in smoothly behind it?"]] } },
  ];

  // citations numbered in order of first appearance over the defense, as in an article: the
  // in-text markers of a slide first, then its cite list. The References pages close the appendix.
  const NUM = {}, ORDER = [];
  slides.concat(backups).forEach((x) => {
    const inText = [...String(x.html || "").matchAll(/data-k="([^"]+)"/g)].flatMap((m) => m[1].split(","));
    x.refs = [...new Set(inText.concat(x.cite || []))].filter((k) => BIB[k]);
    x.refs.forEach((k) => { if (!NUM[k]) { ORDER.push(k); NUM[k] = ORDER.length; } });
    x.refs.sort((p, q) => NUM[p] - NUM[q]);
  });
  const PER = 7, refpage = {};
  for (let j = 0; j < ORDER.length; j += PER) {
    const part = ORDER.slice(j, j + PER), id = `b-refs-${j / PER + 1}`;
    part.forEach((k) => { refpage[k] = id; });
    backups.push({ id, sec: "backup", kicker: "Appendix", title: `References [${j + 1}]–[${j + part.length}]`,
      html: `<ol class="refs">${part.map((k) => `<li><span class="n">[${NUM[k]}]</span><span>${BIB[k][1]}</span></li>`).join("")}</ol>` });
  }

  // appendix index: one link per appendix slide
  backups[0].html = `<div class="body"><div class="bindex">${backups.slice(1).map((b, j) =>
    `<a data-go="${b.id}"><b>A${j + 1}</b><span>${b.title}</span></a>`).join("")}</div></div>`;

  window.TALK = {
    footer: "Rhandy Cardenas  ·  Fail-operational decision-making for intelligent vehicles",
    sections, slides, backups, bib: BIB, bibnum: NUM, refpage,
  };
})();
