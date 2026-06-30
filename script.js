// ==================== TEMPLATE GENERATOR ====================
function generateCoverLetter(formData) {
    const name = formData.candidateName;
    const role = formData.jobRole;
    const company = formData.targetCompany;
    const skills = formData.keySkills;
    
    return `Dear Hiring Manager at ${company},

I am writing to express my enthusiastic interest in the ${role} position at ${company}. As a dedicated professional with strong skills in ${skills}, I am confident that I would be a valuable addition to your team.

My expertise in ${skills} has prepared me to excel in the ${role} role. I have consistently delivered high-quality results, and I am excited about the opportunity to bring my skills to ${company}.

I would welcome the opportunity to discuss how my skills and experience can contribute to ${company}'s continued success. Thank you for considering my application.

Best regards,
${name}`;
}

// ==================== MAIN APP LOGIC ====================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('coverLetterForm');
    const letterPreview = document.getElementById('letterPreview');
    const loadingState = document.getElementById('loadingState');
    const actionButtons = document.getElementById('actionButtons');
    const generateBtn = document.getElementById('generateBtn');
    const toast = document.getElementById('toast');
    
    let formData = {
        candidateName: '',
        jobRole: '',
        targetCompany: '',
        keySkills: ''
    };
    
    // Form submission processing
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        formData.candidateName = document.getElementById('candidateName').value.trim();
        formData.jobRole = document.getElementById('jobRole').value.trim();
        formData.targetCompany = document.getElementById('targetCompany').value.trim();
        formData.keySkills = document.getElementById('keySkills').value.trim();
        
        // Validate all fields are filled
        if (!formData.candidateName || !formData.jobRole || !formData.targetCompany || !formData.keySkills) {
            showToast('❌ Please fill all required fields');
            return;
        }
        
        // Show loading state
        loadingState.style.display = 'block';
        letterPreview.innerHTML = '';
        actionButtons.style.display = 'none';
        generateBtn.disabled = true;
        generateBtn.textContent = 'Generating...';
        
        // Simulate processing time for better UX
        setTimeout(() => {
            try {
                // Generate the cover letter
                const letter = generateCoverLetter(formData);
                
                // Display the letter
                loadingState.style.display = 'none';
                letterPreview.innerHTML = letter.replace(/\n/g, '<br>');
                actionButtons.style.display = 'flex';
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generate Cover Letter';
                showToast('✅ Cover letter ready!');
                
            } catch (error) {
                loadingState.style.display = 'none';
                letterPreview.innerHTML = `
                    <div class="error-state">
                        <p class="error-message">❌ ${error.message}</p>
                    </div>
                `;
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generate Cover Letter';
                showToast('❌ Error generating letter');
            }
        }, 800); // Simulate processing delay
    });
    
    // Copy to Clipboard
    document.getElementById('copyBtn').addEventListener('click', function() {
        const letterText = letterPreview.innerText;
        if (!letterText || letterText.includes('Your cover letter will appear here')) {
            showToast('❌ No letter to copy');
            return;
        }
        
        navigator.clipboard.writeText(letterText)
            .then(() => showToast('📋 Copied to Clipboard!'))
            .catch(() => showToast('❌ Copy Failed. Please try again.'));
    });
    
    // Generate New
    document.getElementById('newBtn').addEventListener('click', function() {
        letterPreview.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">📝</span>
                <p>Your cover letter will appear here</p>
                <small>Fill out the form and click Generate</small>
            </div>
        `;
        actionButtons.style.display = 'none';
        // Clear the form
        document.getElementById('candidateName').value = '';
        document.getElementById('jobRole').value = '';
        document.getElementById('targetCompany').value = '';
        document.getElementById('keySkills').value = '';
        showToast('🔄 Ready for new letter');
    });
    
    // Toast notification function
    function showToast(message) {
        const toastMessage = toast.querySelector('.toast-message');
        toastMessage.textContent = message;
        toast.style.display = 'block';
        toast.style.opacity = '1';
        
        // Clear any existing timeout
        if (window.toastTimeout) {
            clearTimeout(window.toastTimeout);
        }
        
        // Auto-hide after 3 seconds
        window.toastTimeout = setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.style.display = 'none';
                toast.style.opacity = '1';
            }, 300);
        }, 3000);
    }
});