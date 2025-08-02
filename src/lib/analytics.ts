declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

// Google Analytics tracking ID
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-NLM82JL1WZ'

// Check if GA_TRACKING_ID is defined
export const isProduction = process.env.NODE_ENV === 'production'

// Log the pageview with their URL
export const logPageView = (url: string) => {
  if (GA_TRACKING_ID && typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('config', GA_TRACKING_ID, {
      page_location: url,
    })
  }
}

// Log specific events happening
export const logEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (GA_TRACKING_ID && typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track custom events
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (GA_TRACKING_ID && typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', eventName, parameters)
  }
}

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submit', {
    form_name: formName,
  })
}

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  })
}

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (GA_TRACKING_ID && typeof window !== 'undefined' && 'gtag' in window) {
    trackEvent('page_view', {
      page_location: url,
      page_title: title,
    })
  }
}
