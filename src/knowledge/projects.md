\# Projects

Steven Has 3 projects enlisted.



\## Project 1: Restoring Endpoint Visibility – Sophos Central



\# Summary project 1

Restored endpoint visibility for over 200 devices in Sophos Central by correlating NAC, Intune, and Active Directory data, identifying blocked communications, and remediating agent issues. Strengthened network protection and compliance for an international bank.

Date: 2023

Tags: Sophos Central, Intune, NAC, Excel, Active Directory



\# Context Project 1



While managing cybersecurity operations for an international bank with over 5,000 endpoints across multiple locations, I identified a visibility gap within Sophos Central — several endpoints were not reporting to the console. This meant those systems were not receiving critical security updates, posing a significant attack surface risk.



\# Investigation project 1



I correlated data from multiple sources — NAC, Intune, DLP, Active Directory, and Sophos Central — to generate a cross-platform report. This revealed devices that appeared in other consoles but not in Sophos Central.

Further investigation showed NAC only verified software installation, not communication status, meaning disconnected endpoints were not quarantined.



\# Root Cause Analysis Project 1



Log reviews showed Sophos agents couldn’t reach Sophos Central domains or internal update servers. Network policy changes had inadvertently blocked communication due to bandwidth restrictions.



\# Solution Project 1



Mapped endpoint IPs to physical sites using network data.



Coordinated with IT to reinstall and re-register ~200 Sophos agents.



Optimized update configurations to reduce bandwidth usage.



Worked with the network team to restore required access for updates and policy sync.



\# Outcome Project 1



Restored endpoint visibility, redeployed updated security policies, enforced filtering rules, and identified misuse of corporate devices. This strengthened endpoint security, improved bandwidth efficiency, and re-established compliance.



\## Project 2: Automation of Data Wiping and Policy Enforcement for Corporate Android Devices



Summary: Automated secure data deletion and MDM policy enforcement for corporate Android phones using VMware Workspace ONE. Eliminated manual work, reduced data exposure risk, and improved compliance visibility across all branches.

Date: 2023

Tags: Workspace ONE, Android, MDM, Automation, AirWatch



\# Context Project 2



The bank used corporate Android phones for customer document collection via WhatsApp Business. Files were manually deleted daily to prevent data exposure, but no mobile management policies were in place.



\# Problem Project 2



The manual process was inefficient and error-prone. Devices lacked centralized policy control, visibility, and compliance monitoring.



\# Solution Project 2



Designed custom MDM profiles in VMware Workspace ONE.



Automated daily folder wipes to remove sensitive data.



Enrolled all devices and assigned clear ownership.



Implemented security policies to restrict apps and monitor device health.



Configured automated remote wipe and lockout for compromised devices.



\# Outcome Project 2



Improved data security and efficiency across branches. Sensitive data was deleted automatically, and IT gained full visibility and control. Employees could use phones off-site safely, with tracking and enforced policies.



\## Project 3: DGA Domain Incident Response and Containment



Summary: Investigated and contained communication with a malicious DGA domain using Sophos Central, ExtraHop, and Zscaler. Isolated the endpoint, blocked malicious indicators, and improved threat detection and response practices.

Date: 2022

Tags: Incident Response, DGA, Sophos Central, ExtraHop, Zscaler ZIA, Threat Intelligence



\# Context Project 3



ExtraHop raised an alert for suspicious communication with a DGA domain within the corporate network, requiring immediate response.



\# Actions taken Project 3



Searched endpoints using Sophos Central Live Discover.



Identified one active connection to a confirmed malicious domain.



Isolated the endpoint to prevent lateral movement.



Executed live queries to analyze processes and data transfers.



Reviewed endpoint logs for signs of exfiltration or spread.



Cross-referenced IOCs using threat intel sources.



Applied blocks across Sophos and perimeter firewalls.



\# Outcome Project 3



Discovered excessive privileges and unauthorized tools on the affected endpoint. Implemented tighter access controls and application restrictions.

Zscaler ZIA was deployed to enhance visibility and detection. This incident improved detection workflows and reinforced endpoint visibility practices.

