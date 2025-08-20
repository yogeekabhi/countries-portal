import React, { useEffect, useState } from 'react';
import {
	ChevronLeft,
	ChevronRight,
	Facebook,
	Twitter,
	Linkedin,
	Instagram,
	Menu,
	Ellipsis
} from 'lucide-react';
import CountryListPaginate from '../components/CountryListPaginate';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearAllCountryListData,
	updateAllCountryListData
} from '../slices/dashboardSlice';

export default function Dashboard() {
	const dispatch = useDispatch();
	const allCountries = useSelector((state) => state.dashboard.countryList);

	const tabs = ['All', 'Asia', 'Europe'];
	const [activeTab, setActiveTab] = useState('All');
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		if (!allCountries.length) {
			const regionWiseEndPoint =
				activeTab === 'All'
					? 'https://restcountries.com/v2/all?fields=name,region,flag'
					: `https://restcountries.com/v2/region/${activeTab.toLowerCase()}`;
			getCountriesByRegion(regionWiseEndPoint).then((countries) => {
				// Dispatch action to update country list in the store
				dispatch(updateAllCountryListData(countries));
			});
		}
	}, [allCountries, activeTab]);

	const getCountriesByRegion = async (apiURL) => {
		try {
			const response = await fetch(apiURL);
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching countries:', error);
			return [];
		}
	};

	const nextSlide = () => {
		setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev === 1 ? 0 : 1));
	};

	const updateActTab = (tab) => {
		dispatch(clearAllCountryListData());
		setActiveTab(tab);
	};

	const ImagePlaceholder = ({ className = '' }) => (
		<div className={`image-placeholder ${className}`}>
			<div className='placeholder-icon'>
				<svg width='40' height='40' viewBox='0 0 24 24' fill='currentColor'>
					<rect x='3' y='3' width='7' height='7' rx='1' />
					<rect x='14' y='3' width='7' height='7' rx='1' />
					<rect x='14' y='14' width='7' height='7' rx='1' />
					<rect x='3' y='14' width='7' height='7' rx='1' />
				</svg>
			</div>
		</div>
	);

	return (
		<div className='countries-page'>
			{/* Desktop Navigation */}
			<div className='desktop-nav'>
				<div className='container'>
					<div className='nav-header'>
						<h1 className='page-title'>Countries</h1>
						<nav className='nav-tabs'>
							{tabs.map((tab) => (
								<button
									key={tab}
									onClick={() => updateActTab(tab)}
									className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
								>
									{tab}
								</button>
							))}
						</nav>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			<div className='mobile-nav'>
				<div className='mobile-header'>
					<h1 className='page-title'>Countries</h1>
					<button className='menu-button'>
						<Menu size={20} />
					</button>
				</div>
			</div>

			{/* Welcome Section */}
			<div className='container'>
				<div className='welcome-section'>
					<div className='welcome-line'></div>
					<h2 className='welcome-title'>WELCOME</h2>
					<div className='welcome-line'></div>
				</div>

				{/* Hero Images Section - Desktop */}
				<div className='hero-section-desktop'>
					<div className='hero-grid'>
						<div className='hero-main'>
							<div className='hero-card'>
								<ImagePlaceholder />
								<div className='carousel-controls'>
									<div className='carousel-nav'>
										<ChevronLeft
											size={20}
											className='carousel-arrow'
											onClick={prevSlide}
										/>
										<div className='carousel-dots'>
											<div
												className={`dot ${currentSlide === 0 ? 'active' : ''}`}
											></div>
											<div
												className={`dot ${currentSlide === 1 ? 'active' : ''}`}
											></div>
										</div>
										<ChevronRight
											size={20}
											className='carousel-arrow'
											onClick={nextSlide}
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='hero-sidebar'>
							<div className='hero-card'>
								<ImagePlaceholder />
							</div>
						</div>
					</div>
				</div>

				{/* Hero Images Section - Mobile */}
				<div className='hero-section-mobile'>
					<div className='hero-card'>
						<ImagePlaceholder />
					</div>
					<div className='hero-card'>
						<ImagePlaceholder />
						<div className='carousel-controls'>
							<div className='carousel-nav'>
								<ChevronLeft
									size={20}
									className='carousel-arrow'
									onClick={prevSlide}
								/>
								<div className='carousel-dots'>
									<div
										className={`dot ${currentSlide === 0 ? 'active' : ''}`}
									></div>
									<div
										className={`dot ${currentSlide === 1 ? 'active' : ''}`}
									></div>
								</div>
								<ChevronRight
									size={20}
									className='carousel-arrow'
									onClick={nextSlide}
								/>
							</div>
						</div>
					</div>
				</div>
				{/* Country List Section */}
				{!allCountries.length ? (
					<div className='countries-loading' role='status' aria-live='polite'>
						<Ellipsis className='loading-icon' size={28} />
					</div>
				) : (
					<CountryListPaginate pageSize={12} />
				)}
			</div>

			{/* Footer */}
			<footer className='footer'>
				<div className='social-icons'>
					<div className='social-icon'>
						<Facebook size={18} />
					</div>
					<div className='social-icon'>
						<Twitter size={18} />
					</div>
					<div className='social-icon'>
						<Linkedin size={18} />
					</div>
					<div className='social-icon'>
						<Instagram size={18} />
					</div>
				</div>
				<div className='footer-email'>
					<p>Example@email.com</p>
				</div>
				<div className='footer-copyright'>
					<p>Copyright © 2020 Name. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
