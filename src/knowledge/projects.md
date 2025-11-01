Project: Restoring Endpoint Visibility – Sophos Central

Context:



While managing cybersecurity operations for an international bank with over 5,000 endpoints across multiple locations, I identified a visibility gap within Sophos Central — several endpoints were not reporting to the console. This meant those systems were not receiving critical security updates, posing a significant attack surface risk.

Investigation



To detect the affected endpoints, I correlated data from multiple sources — NAC, Intune, DLP, Active Directory, and Sophos Central — to generate a cross-platform report. This analysis revealed that certain devices appeared in other management consoles but not in Sophos Central.



Further investigation showed that the NAC policy only verified software installation, not agent communication status. As a result, disconnected endpoints were not quarantined from the network, even though they were not updating their Sophos agents.

Root Cause Analysis



Log reviews from affected machines showed that Sophos agents could not reach Sophos Central’s public domains or the internal update cache and message relay servers. Coordination with the network team revealed that recent network policy changes had inadvertently blocked this communication due to bandwidth concerns.

Solution



Approximately 200 endpoints across multiple branches required agent remediation. I developed and executed a recovery plan that included:



&nbsp;   Mapping endpoint IPs to physical locations using network segment data to coordinate on-site IT actions.

&nbsp;   Collaborating with the IT team to reinstall and re-register the Sophos agents within a 10-day deadline.

&nbsp;   Optimizing agent update configurations to reduce bandwidth usage.

&nbsp;   Working with the network team to restore access to required Sophos domains and ports for update and policy synchronization.



Outcome:



After restoring visibility, I successfully redeployed updated security policies, enforced web filtering rules, and identified misuse of corporate devices (e.g., unauthorized video streaming). The project significantly strengthened the organization’s endpoint security posture, improved bandwidth efficiency, and re-established full endpoint compliance and monitoring.

