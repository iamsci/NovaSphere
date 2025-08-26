export default function OnboardingLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">Creator Onboarding</h1>
          {children}
        </div>
      </div>
    );
  }
  