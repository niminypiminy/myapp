"use client"; 

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const OurSecurityModel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for the activeTab query parameter
    const activeTab = searchParams.get('activeTab');

    if (activeTab) {
      // Navigate to the appropriate tab in the dashboard
      router.push(`/dashboard?activeTab=${activeTab}`);
    }
  }, [router, searchParams]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-4">
          <span className="text-gray-600 text-sm">By [Author Name] | [Date]</span>
        </div>

        <h1 className="text-4xl sm:text-3xl font-bold mb-4 border-b-2 p-2 rounded">Our Infrastructure</h1>
        <p className="text-base sm:text-sm">Enhancing Backend Security with Xano: A Comprehensive Overview</p>
        <p className="text-base sm:text-sm">In today's digital landscape, backend security is paramount for businesses looking to protect sensitive data and maintain user trust. Xano, a powerful no-code backend solution, prioritizes security, offering a robust suite of features designed to safeguard your applications.</p>

        <h2 className="text-2xl sm:text-xl font-bold mt-6 bg-gray-100 p-2 rounded">1. Encryption at Rest</h2>
        <p className="text-base sm:text-sm">One of the cornerstone features of Xano’s security model is encryption at rest. This means that data stored in Xano’s databases is automatically encrypted, ensuring that even if unauthorized access occurs, the information remains unreadable without the appropriate decryption keys.</p>
        <p className="font-bold">Benefits:</p>
        <ul className="list-disc list-inside pl-4 text-base sm:text-sm">
          <li><strong>Data Protection:</strong> Sensitive information such as user credentials, personal data, and financial details are shielded from potential breaches.</li>
          <li><strong>Compliance:</strong> Encryption at rest helps meet regulatory requirements such as GDPR and HIPAA, providing peace of mind for businesses operating in regulated industries.</li>
        </ul>

        <h2 className="text-2xl sm:text-xl font-bold mt-6 bg-gray-100 p-2 rounded">2. SSL/TLS Encryption</h2>
        <p className="text-base sm:text-sm">Xano provides SSL (Secure Socket Layer) encryption for all data transmitted between clients and servers. This ensures that data in transit is encrypted, preventing eavesdropping and man-in-the-middle attacks.</p>
        <p className="font-bold">Benefits:</p>
        <ul className="list-disc list-inside pl-4 text-base sm:text-sm">
          <li><strong>Secure Communication:</strong> SSL protects the integrity and confidentiality of data as it moves across the internet.</li>
          <li><strong>User Trust:</strong> Websites and applications using SSL are marked as secure, fostering trust among users who see the padlock icon in their browsers.</li>
        </ul>

        <h2 className="text-2xl sm:text-xl font-bold mt-6 bg-gray-100 p-2 rounded">3. Role-Based Access Control (RBAC)</h2>
        <p className="text-base sm:text-sm">Xano incorporates role-based access control, allowing developers to set granular permissions for different users and roles within the application. This feature ensures that only authorized personnel can access or manipulate sensitive data.</p>
        <p className="font-bold">Benefits:</p>
        <ul className="list-disc list-inside pl-4 text-base sm:text-sm">
          <li><strong>Minimized Risk:</strong> Limiting access to data and functionality reduces the potential for accidental or malicious misuse.</li>
          <li><strong>Audit Trails:</strong> With clear access logs, organizations can monitor who accessed what data and when, enhancing accountability.</li>
        </ul>

        <h2 className="text-2xl sm:text-xl font-bold mt-6 bg-gray-100 p-2 rounded">4. API Security</h2>
        <p className="text-base sm:text-sm">Xano emphasizes API security, a critical aspect of modern applications. The platform offers features such as API key generation and authentication to ensure that only authorized users can access backend services.</p>
        <p className="font-bold">Benefits:</p>
        <ul className="list-disc list-inside pl-4 text-base sm:text-sm">
          <li><strong>Controlled Access:</strong> API keys can be regenerated, and permissions can be adjusted, providing flexibility and control over who interacts with your backend.</li>
          <li><strong>Monitoring and Reporting:</strong> Xano provides tools to monitor API usage, enabling quick responses to any suspicious activities.</li>
        </ul>

        <h2 className="text-2xl sm:text-xl font-bold mt-6 bg-gray-100 p-2 rounded">5. Regular Security Updates</h2>
        <p className="text-base sm:text-sm">Xano is committed to maintaining a secure environment through regular updates and patches. The platform continuously monitors for vulnerabilities and implements necessary fixes to protect its infrastructure.</p>
        <p className="font-bold">Benefits:</p>
        <ul className="list-disc list-inside pl-4 text-base sm:text-sm">
          <li><strong>Proactive Defense:</strong> Regular updates mitigate risks from newly discovered vulnerabilities, keeping your application secure.</li>
          <li><strong>Peace of Mind:</strong> Businesses can focus on development without worrying about backend vulnerabilities.</li>
        </ul>

        <h2 className="text-2xl sm:text-xl font-bold mt-6 bg-gray-100 p-2 rounded">6. Data Backups and Disaster Recovery</h2>
        <p className="text-base sm:text-sm">Xano ensures that your data is safe with automatic backups and a robust disaster recovery plan. This feature allows businesses to restore data quickly in case of an unforeseen incident.</p>
        <p className="font-bold">Benefits:</p>
        <ul className="list-disc list-inside pl-4 text-base sm:text-sm">
          <li><strong>Data Integrity:</strong> Regular backups protect against data loss, ensuring that critical information can be restored.</li>
          <li><strong>Business Continuity:</strong> A solid disaster recovery strategy helps minimize downtime and maintain operations.</li>
        </ul>

        <h2 className="text-2xl sm:text-xl font-bold mt-6 bg-gray-100 p-2 rounded">Conclusion</h2>
        <p className="text-base sm:text-sm">In an era where data breaches and cyber threats are increasingly common, Xano’s comprehensive security measures provide a reliable foundation for backend development. With features like encryption at rest, SSL support, role-based access control, and more, Xano empowers businesses to build secure applications without the complexity often associated with backend infrastructure. By choosing Xano, you not only enhance your application’s security but also foster trust with your users, ensuring that their data is well-protected.</p>
        <p className="text-base sm:text-sm">For businesses looking to prioritize backend security, Xano stands out as a formidable solution that integrates powerful security features seamlessly into the development process.</p>
      </div>
    </Suspense>
  );
};

export default OurSecurityModel;