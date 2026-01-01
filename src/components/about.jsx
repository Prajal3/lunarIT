const About = () => {


    return (
       <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-6">About MindSpace</h2>
      
      <div className="bg-white rounded-xl p-8 shadow-lg space-y-6">
        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            MindSpace is dedicated to making mental health support accessible to everyone. We believe that tracking your emotional wellbeing and having access to helpful resources should be simple, private, and judgment-free.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">What We Offer</h3>
          <p className="text-gray-600 leading-relaxed">
            Our platform provides tools for daily mood tracking, insightful visualizations of your emotional patterns, evidence-based self-help resources, and quick access to emergency support when you need it most.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Important Disclaimer</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-gray-700 leading-relaxed">
              MindSpace is designed to complement, not replace, professional mental health care. If you're experiencing severe symptoms, thoughts of self-harm, or a mental health crisis, please seek immediate help from a qualified healthcare provider or contact emergency services.
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Privacy & Safety</h3>
          <p className="text-gray-600 leading-relaxed">
            Your privacy is our priority. All your mood entries and personal information are stored securely. We never share your data with third parties without your explicit consent.
          </p>
        </section>
      </div>
    </div>
    )
}
export default About;